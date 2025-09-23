import { ObjectUtils } from '@/utils/objectUtils';
import {
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DragStartEvent } from '@dnd-kit/core/dist/types';
import { arrayMove } from '@dnd-kit/sortable';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

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
  onDragEndSuccess?: (
    data: void,
    variables: { data: T; newColumnId: string },
    context: unknown,
  ) => void;
  onDragEndError?: (
    error: Error,
    variables: { data: T; newColumnId: string },
    context: unknown,
  ) => void;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const [activeData, setActiveData] = useState<T | null>(null);
  const [activeColumn, setActiveColumn] = useState('');

  // optimistic approach purposes for dragOver
  const [originalColumn, setOriginalColumn] = useState('');
  const [originalIndex, setOriginalIndex] = useState(0);

  const dragEndMutation = useMutation({
    mutationKey: ['dragEndSubmit'],
    mutationFn: async ({
      data,
      newColumnId,
    }: {
      data: T;
      newColumnId: string;
    }) => onDragEndSubmit(data, newColumnId),
    onSuccess: onDragEndSuccess,
    onError: (error, variables, context) => {
      console.log('mutation error', { error, variables, context });
      revertData(variables.data, variables.newColumnId);
      onDragEndError?.(error, variables, context);
    },
  });

  const revertData = useCallback(
    (selectedData: T, finalColumn: string) => {
      setDataObj((prevDataObj) => {
        const originColumnData = prevDataObj[originalColumn];

        // this is to prevent reverting data twice due to strict mode
        // or other unknown magical thing that made me frustrated for hours
        if (originColumnData.some((data) => data.id === selectedData.id)) {
          return prevDataObj;
        }

        const finalColumnData = prevDataObj[finalColumn];
        prevDataObj[finalColumn] = finalColumnData.filter(
          (data) => data.id !== selectedData.id,
        );
        prevDataObj[originalColumn] = originColumnData
          .slice(0, originalIndex)
          .concat(selectedData)
          .concat(originColumnData.slice(originalIndex));

        return prevDataObj;
      });
    },
    [originalColumn, originalIndex],
  );

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
    newDataObj[activeColumn] = arrayMove(
      newDataObj[overColumn],
      activeIndex,
      overIndex,
    );
    return newDataObj;
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveData(null);
    setActiveColumn('');
    const { active, over } = event;
    const activeId = active.id.toString();
    const overId = over ? over.id.toString() : null;
    const activeColumn: string | null =
      active.data.current?.sortable.containerId ?? null;

    // if over container id is null, that means the target container is empty
    const overColumn: string | null =
      over?.data.current?.sortable.containerId ?? overId;

    if (!activeColumn || !overColumn || activeColumn !== overColumn) return;

    const activeIndex = dataObj[activeColumn].findIndex(
      (data) => data.id === activeId,
    );

    await dragEndMutation.mutateAsync({
      data: dataObj[activeColumn][activeIndex],
      newColumnId: overColumn,
    });

    console.log('drag end mutation is finished');
  };

  const handleDragOver = useCallback(async (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = active.id.toString();
    const overId = over?.id.toString() ?? null;
    const activeColumn: string | null =
      active.data.current?.sortable.containerId ?? null;

    // if over container id is null, that means the target container is empty
    const overColumn: string | null =
      over?.data.current?.sortable.containerId ?? overId;

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setActiveColumn(overColumn);
    setDataObj((prevDataObj) => {
      const newDataObj = ObjectUtils.cloneObject(prevDataObj);
      const activeData = newDataObj[activeColumn];
      const overData = newDataObj[overColumn];

      const activeIndex = activeData.findIndex((data) => data.id === activeId);
      const overIndex = overData.findIndex((data) => data.id === overId);

      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overData.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overData.length + 1;
      };

      newDataObj[activeColumn] = newDataObj[activeColumn].filter(
        (data) => data.id !== activeId,
      );
      newDataObj[overColumn] = overData
        .slice(0, newIndex())
        .concat(activeData[activeIndex])
        .concat(overData.slice(newIndex()));

      console.log(
        'new data from drag over',
        JSON.stringify(newDataObj, null, 2),
      );

      return newDataObj;
    });
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id;
    const activeColumn =
      event.active.data.current?.sortable.containerId ?? null;
    if (!activeColumn) return;

    const selectedDataIndex = dataObj[activeColumn].findIndex(
      (data) => data.id === activeId,
    );
    if (selectedDataIndex < 0) return;
    setActiveData(dataObj[activeColumn][selectedDataIndex]);
    setOriginalColumn(activeColumn);
    setOriginalIndex(selectedDataIndex);
  };

  return {
    sensors,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    dndData: dataObj,
    /**
     * WARNING: make sure `handleDragStart` is implemented in the context,
     * otherwise this will result to `null` no matter what
     */
    activeData,
    activeColumn,
  };
};
