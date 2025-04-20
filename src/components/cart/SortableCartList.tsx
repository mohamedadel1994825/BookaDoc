import React from "react";
import { Box } from "@mui/material";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableCartItem from "./SortableCartItem";
import { CartItem } from "@/types/cart";

interface SortableCartListProps {
  items: CartItem[];
  onDragEnd: (event: DragEndEvent) => void;
  onRemoveItem: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
  removingItemId: number | null;
}

const SortableCartList: React.FC<SortableCartListProps> = ({
  items,
  onDragEnd,
  onRemoveItem,
  onQuantityChange,
  removingItemId,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum distance before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={items.map(item => item.id.toString())}
        strategy={verticalListSortingStrategy}
      >
              <Box
                  
          sx={{
            transition: "background-color 0.2s ease",
          }}
        >
          {items.map((item) => (
            <SortableCartItem
              key={item.id}
              item={item}
              onRemove={onRemoveItem}
              onQuantityChange={onQuantityChange}
              removingItemId={removingItemId}
            />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default SortableCartList;