import React, { useState } from 'react';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { EdgeData, NodeData } from '../src/types';
import { createEdgeFromNodes, hasLink, removeAndUpsertNodes } from '../src/helpers';

export default {
  title: 'Demos/Drag',
  component: Canvas,
  subcomponents: {
    Node,
    Edge,
    MarkerArrow,
    Arrow,
    Icon,
    Label,
    Port,
    Remove,
    Add
  }
};

export const NodeOnlyDrag = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: '1'
        },
        {
          id: '2',
          text: '2'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        }
      ]}
      node={
        <Node
          dragType="all"
        />
      }
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const PortOnlyDrag = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: '1',
          ports: makeFakePorts('1')
        },
        {
          id: '2',
          text: '2',
          ports: makeFakePorts('2')
        }
      ]}
      edges={[
        makeFakeEdgeWithPorts('1', '2'),
      ]}
      node={
        <Node
          dragType="port"
        />
      }
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const MultiPortOnlyDrag = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: '1',
          ports: makeFakePorts('1')
        },
        {
          id: '2',
          text: '2'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        }
      ]}
      node={
        <Node
          dragType="multiportOnly"
        />
      }
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const AllDrag = () => (
  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: '1',
          ports: makeFakePorts('1')
        },
        {
          id: '2',
          text: '2'
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2'
        }
      ]}
      node={
        <Node
          dragType="all"
        />
      }
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const NodeRearranging = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: '1',
      text: '1'
    },
    {
      id: '2',
      text: '2'
    },
    {
      id: '3',
      text: '3'
    },
    {
      id: '4',
      text: '4'
    },
    {
      id: '5',
      text: '5'
    },
    {
      id: '6',
      text: '6'
    }
  ]);

  const [edges, setEdges] = useState<EdgeData[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    },
    {
      id: '2-3',
      from: '2',
      to: '3'
    },
    {
      id: '2-4',
      from: '2',
      to: '4'
    },
    {
      id: '2-5',
      from: '2',
      to: '5'
    },
    {
      id: '5-6',
      from: '5',
      to: '6'
    }
  ]);

  const [droppable, setDroppable] = useState<boolean>(false);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        node={
          <Node
            dragType="all"
            onEnter={(_event, node) => setEnteredNode(node)}
            onLeave={() => setEnteredNode(null)}
            onDragEnd={(_event, _coords, node) => {
              console.log('Entered Node:', enteredNode);
              console.log('Node to Move:', node);

              if (
                droppable &&
                enteredNode &&
                !hasLink(edges, enteredNode, node)
              ) {
                const newEdges = edges.filter(e => e.to !== node.id);

                setEdges([
                  ...newEdges,
                  createEdgeFromNodes(enteredNode, node)
                ]);
              }
            }}
          />
        }
        dragNode={<Node />}
        dragEdge={null}
        onCanvasClick={event => console.log('Canvas Clicked', event)}
        onMouseEnter={() => setDroppable(true)}
        onMouseLeave={() => setDroppable(false)}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const NodeRearrangingUpsert = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: '1',
      text: '1'
    },
    {
      id: '2',
      text: '2'
    },
    {
      id: '3',
      text: '3'
    },
    {
      id: '4',
      text: '4'
    },
    {
      id: '5',
      text: '5'
    },
    {
      id: '6',
      text: '6'
    }
  ]);

  const [edges, setEdges] = useState<EdgeData[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    },
    {
      id: '2-3',
      from: '2',
      to: '3'
    },
    {
      id: '2-4',
      from: '2',
      to: '4'
    },
    {
      id: '2-5',
      from: '2',
      to: '5'
    },
    {
      id: '5-6',
      from: '5',
      to: '6'
    }
  ]);

  const [droppable, setDroppable] = useState<boolean>(false);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        node={
          <Node
            dragType="all"
            onEnter={(_event, node) => setEnteredNode(node)}
            onLeave={() => setEnteredNode(null)}
            onDragEnd={(_event, _coords, node) => {
              console.log('Entered Node:', enteredNode);
              console.log('Node to Move:', node);

              if (
                droppable &&
                enteredNode &&
                !hasLink(edges, enteredNode, node)
              ) {
                const result = removeAndUpsertNodes(
                  nodes,
                  edges,
                  node
                );

                setEdges([
                  ...result.edges,
                  createEdgeFromNodes(enteredNode, node)
                ]);
              }
            }}
          />
        }
        dragNode={<Node />}
        dragEdge={null}
        onCanvasClick={event => console.log('Canvas Clicked', event)}
        onMouseEnter={() => setDroppable(true)}
        onMouseLeave={() => setDroppable(false)}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export const NodePortRearranging = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: '1',
      text: '1',
      ports: makeFakePorts('1')
    },
    {
      id: '2',
      text: '2',
      ports: makeFakePorts('2')
    },
    {
      id: '3',
      text: '3',
      ports: makeFakePorts('3')
    },
    {
      id: '4',
      text: '4',
      ports: makeFakePorts('4')
    },
    {
      id: '5',
      text: '5',
      ports: makeFakePorts('5')
    },
    {
      id: '6',
      text: '6',
      ports: makeFakePorts('6')
    }
  ]);

  const [edges, setEdges] = useState<EdgeData[]>([
    makeFakeEdgeWithPorts('1', '2'),
    makeFakeEdgeWithPorts('2', '3'),
    makeFakeEdgeWithPorts('2', '4'),
    makeFakeEdgeWithPorts('2', '5'),
    makeFakeEdgeWithPorts('5', '6')
  ]);

  const [dragType, setDragType] = useState<null | 'port' | 'node'>(null);
  const [droppable, setDroppable] = useState<boolean>(false);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        node={
          <Node
            dragType="all"
            onEnter={(_event, node) => setEnteredNode(node)}
            onLeave={() => setEnteredNode(null)}
            onDragStart={(_event, _coords, node) => {
              console.log('Dragging Node:', node);
              setDragType('node');
            }}
            onDragEnd={(_event, _coords, node) => {
              console.log('Drag End', dragType, enteredNode, node);

              if (droppable && enteredNode) {
                if (dragType === 'node') {
                  if (!hasLink(edges, enteredNode, node)) {
                    // TODO: Need to make handle ports
                    const result = removeAndUpsertNodes(
                      nodes,
                      edges,
                      node
                    );

                    setEdges([
                      ...result.edges,
                      makeFakeEdgeWithPorts(enteredNode.id, node.id)
                    ]);
                  }
                } else if (dragType === 'port') {
                  setEdges([
                    ...edges,
                    makeFakeEdgeWithPorts(node.id, enteredNode.id)
                  ]);
                }
              }

              setDragType(null);
            }}
            port={
              <Port
                onDragStart={(_event, _coords, node) => {
                  console.log('Dragging Port:', node);
                  setDragType('port');
                }}
              />
            }
          />
        }
        dragNode={dragType === 'node' ? <Node /> : null}
        dragEdge={dragType === 'port' ? <Edge add={null} /> : null}
        onCanvasClick={(event) => console.log('Canvas Clicked', event)}
        onMouseEnter={() => setDroppable(true)}
        onMouseLeave={() => setDroppable(false)}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

const makeFakePorts: any = (id: string) => ([
  {
    id: `${id}-from`,
    width: 10,
    height: 10,
    side: 'SOUTH'
  },
  {
    id: `${id}-to`,
    width: 10,
    height: 10,
    side: 'NORTH'
  }
]);

const makeFakeEdgeWithPorts = (from: string, to: string) => ({
  id: `${from}-${to}`,
  from,
  to,
  fromPort: `${from}-from`,
  toPort: `${to}-to`
});
