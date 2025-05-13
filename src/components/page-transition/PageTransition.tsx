import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

interface TransitionWrapperProps {
  isTransitioning: boolean;
  isEntering: boolean;
}

const TransitionWrapper = styled.div<TransitionWrapperProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props: TransitionWrapperProps) => props.isEntering ? 0 : 1};
  transition: opacity 0.3s ease-in-out;
  pointer-events: ${(props: TransitionWrapperProps) => props.isTransitioning ? 'none' : 'auto'};
`;

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(children);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const isRouteChange = prevPathRef.current !== location.pathname;
    prevPathRef.current = location.pathname;

    if (!isRouteChange) {
      setCurrentChildren(children);
      return;
    }

    setIsTransitioning(true);
    setIsEntering(true);
    
    const enterTimer = setTimeout(() => {
      setCurrentChildren(children);
      setIsEntering(false);
    }, 300);

    const exitTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [location.pathname, children]);

  return (
    <TransitionWrapper isTransitioning={isTransitioning} isEntering={isEntering}>
      {currentChildren}
    </TransitionWrapper>
  );
}; 