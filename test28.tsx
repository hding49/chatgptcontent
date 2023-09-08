import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface Item {
  id: string;
  content: string;
}

const initialItems: Item[] = [
  { id: '1', content: 'Item 1' },
  { id: '2', content: 'Item 2' },
  { id: '3', content: 'Item 3' },
  { id: '4', content: 'Item 4' },
];

const HorizontalDragAndDrop: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newItems = [...items];
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);
    setItems(newItems);

    handleDragEnd(newItems);
  };

  const handleDragEnd = (newOrder: Item[]) => {
    console.log('更改后的顺序数组:', newOrder);
  };

  return (
    <Container>
      <Row>
        <Col>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    display: 'flex',
                    overflowX: 'auto',
                  }}
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: '16px',
                            margin: '8px',
                            background: 'white', // 设置白色背景
                            borderRadius: '50%', // 设置边框为椭圆形
                            userSelect: 'none',
                            color: 'black', // 设置字体颜色为黑色
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Col>
      </Row>
    </Container>
  );
};

export default HorizontalDragAndDrop;
