import React from 'react';
import { Stage, Layer, Star} from 'react-konva';
import { FaGithub } from "react-icons/fa";
import { DiscussionEmbed } from 'disqus-react';
import { disqusSortname } from '../../constant';
/* import useImage from 'use-image'; 
import fileImgUrl from '../../assets/file.png'; */

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: 'target-' + i.toString(),
    x: Math.random() * (window.innerWidth - 280),
    y: Math.random() * window.innerHeight - 100,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();


const DragAStar = () => {
  const [stars, setStars] = React.useState(INITIAL_STATE);

  const handleDragStart = (e: any) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = (_: any) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };
  
  /* const [image] = useImage(fileImgUrl) */
  const disqusConfig = {
    url: "http://localhost:5173",
    identifier: "drag-a-star",
    title: "Drag a Star"
  }

  return (
    <>
    <Stage width={window.innerWidth - 280} height={window.innerHeight - 100}>
      <Layer>
        {stars.map((star) => (
          <Star
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={star.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={star.isDragging ? 10 : 5}
            shadowOffsetY={star.isDragging ? 10 : 5}
            scaleX={star.isDragging ? 1.2 : 1}
            scaleY={star.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
{/*         <Image
          image={image}
          x={100}
          y={100}
          draggable
          /> */}
      </Layer>
    </Stage>
    <p><b>Instructions : </b> Drag a star and see dragging effect. <a href='https://github.com/frederic-lang/awesome-konva-react-demos/blob/master/src/demos/drag-a-star/DragAStar.tsx' target='_blank'><FaGithub /></a></p>
    <DiscussionEmbed
      shortname={disqusSortname}
      config={disqusConfig}
      />
    </>
  );
};

export default DragAStar;
