import { ObjectUtils } from "@/utils/objectUtils";
import { KeyboardSensor, MouseSensor, useSensor, useSensors, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { Coordinates, DragStartEvent } from "@dnd-kit/core/dist/types";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, startTransition, useOptimistic, useState } from "react";

export const useDragAndDrop = <T extends { id: string }>({
  dataObj,
  setDataObj,
  onDragEndSubmit,
  onDragEndSuccess,
  onDragEndError,
}: {
  dataObj: Record<string, T[]>;
  setDataObj: Dispatch<SetStateAction<Record<string, T[]>>>;
  onDragEndSubmit: (data: T, newColumnId: string) => Promise<void>;
  onDragEndSuccess?: (data: void, variables: { data: T; newColumnId: string }, context: unknown) => void;
  onDragEndError?: (error: Error, variables: { data: T; newColumnId: string }, context: unknown) => void;
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [optimisticDataObj, setOptimisticDataObj] = useOptimistic<typeof dataObj | null>(dataObj);

  const [activeData, setActiveData] = useState<T | null>(null);

  const dragEndMutation = useMutation({
    mutationKey: ["dragEndSubmit"],
    mutationFn: async ({ data, newColumnId }: { data: T; newColumnId: string }) => onDragEndSubmit(data, newColumnId),
    onSuccess: onDragEndSuccess,
    onError: onDragEndError,
  });

  const updateDragEndData = ({
    prevDataObj,
    activeColumn,
    overColumn,
    activeIndex,
    overIndex,
  }: {
    prevDataObj: typeof dataObj;
    activeColumn: string;
    overColumn: string;
    activeIndex: number;
    overIndex: number;
  }) => {
    const newDataObj = ObjectUtils.cloneObject(prevDataObj);
    newDataObj[activeColumn] = arrayMove(newDataObj[overColumn], activeIndex, overIndex);
    return newDataObj;
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveData(null);
    const { active, over } = event;
    const activeId = active.id.toString();
    const overId = over ? over.id.toString() : null;
    const activeColumn: string | null = active.data.current?.sortable.containerId ?? null;

    // if over container id is null, that means the target container is empty
    const overColumn: string | null = over?.data.current?.sortable.containerId ?? overId;

    if (!activeColumn || !overColumn || activeColumn !== overColumn) return;

    const activeIndex = dataObj[activeColumn].findIndex((data) => data.id === activeId);
    const overIndex = dataObj[overColumn].findIndex((data) => data.id === overId);

    startTransition(async () => {
      setOptimisticDataObj((prevDataObj) => {
        if (prevDataObj) {
          return updateDragEndData({ prevDataObj, activeColumn, overColumn, activeIndex, overIndex });
        }
        return null;
      });

      await dragEndMutation.mutateAsync({ data: dataObj[activeColumn][activeIndex], newColumnId: overColumn });

      setDataObj((prevDataObj) => {
        return updateDragEndData({ prevDataObj, activeColumn, overColumn, activeIndex, overIndex });
      });
      setOptimisticDataObj(null);
    });
  };

  const updateDragOverData = ({
    prevDataObj,
    delta,
    activeColumn,
    overColumn,
    activeId,
    overId,
  }: {
    prevDataObj: typeof dataObj;
    delta: Coordinates;
    activeColumn: string;
    overColumn: string;
    activeId: string;
    overId: string | null;
  }) => {
    const newDataObj = ObjectUtils.cloneObject(prevDataObj);
    const activeData = newDataObj[activeColumn];
    const overData = newDataObj[overColumn];

    const activeIndex = activeData.findIndex((data) => data.id === activeId);
    const overIndex = overData.findIndex((data) => data.id === overId);

    const newIndex = () => {
      const putOnBelowLastItem = overIndex === overData.length - 1 && delta.y > 0;
      const modifier = putOnBelowLastItem ? 1 : 0;
      return overIndex >= 0 ? overIndex + modifier : overData.length + 1;
    };

    newDataObj[activeColumn] = newDataObj[activeColumn].filter((data) => data.id !== activeId);
    newDataObj[overColumn] = overData
      .slice(0, newIndex())
      .concat(activeData[activeIndex])
      .concat(overData.slice(newIndex()));

    return newDataObj;
  };

  const handleDragOver = async (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = active.id.toString();
    const overId = over?.id.toString() ?? null;
    const activeColumn: string | null = active.data.current?.sortable.containerId ?? null;

    // if over container id is null, that means the target container is empty
    const overColumn: string | null = over?.data.current?.sortable.containerId ?? overId;

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setDataObj((prevDataObj) => {
      return updateDragOverData({ prevDataObj, delta, activeColumn, overColumn, activeId, overId });
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id;
    const activeColumn = event.active.data.current?.sortable.containerId ?? null;
    if (!activeColumn) return;

    const selectedData = dataObj[activeColumn].find((data) => data.id === activeId);
    if (!selectedData) return;
    setActiveData(selectedData);
  };

  return {
    sensors,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    dndData: optimisticDataObj ?? dataObj,
    /**
     * WARNING: make sure `handleDragStart` is implemented in the context,
     * otherwise this will result to `null` no matter what
     */
    activeData,
  };
};
