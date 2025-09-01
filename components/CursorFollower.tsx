import React, { useEffect, useRef } from 'react';

const CursorFollower: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const cursor = {
      x: 0,
      y: 0
    };
    const follower = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      speed: 0.1
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cursor.x}px, ${cursor.y}px, 0)`;
      }

      if (followerRef.current) {
        follower.dx = cursor.x - follower.x;
        follower.dy = cursor.y - follower.y;
        follower.x += follower.dx * follower.speed;
        follower.y += follower.dy * follower.speed;
        followerRef.current.style.transform = `translate3d(${follower.x}px, ${follower.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      document.body.classList.add('cursor-grow');
    };
    const handleMouseLeave = () => {
      document.body.classList.remove('cursor-grow');
    };

    window.addEventListener('mousemove', handleMouseMove);
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={followerRef} className="cursor-follower"></div>
    </>
  );
};

export default CursorFollower;