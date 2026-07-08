import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { PawIcon } from "./Logo";

export default function GlobalScrollTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(5000); // default fallback height
  const [containerTop, setContainerTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(1000);
  const [windowWidth, setWindowWidth] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1200);
  const [sectionOffsets, setSectionOffsets] = useState<number[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // rect.top + window.scrollY is the absolute top of the container relative to the document
        setContainerTop(rect.top + window.scrollY);
        setHeight(rect.height);
      }
      setViewportHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);

      // Get section offsets relative to the container
      const ids = ["inicio", "servicios", "ubicacion", "testimonios", "faq"];
      const offsets = ids.map((id) => {
        const el = document.getElementById(id);
        return el ? el.offsetTop : 0;
      });
      setSectionOffsets(offsets);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    
    resizeObserver.observe(containerRef.current);
    
    window.addEventListener("resize", updateDimensions, { passive: true });
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Track the scroll position with requestAnimationFrame throttling
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticked = false;
    const handleScroll = () => {
      if (!ticked) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticked = false;
        });
        ticked = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Paw steps closer together (110px) for a more realistic walk
  const pawSpacing = 110;

  // Function to calculate path X coordinate dynamically based on current Y height
  const getPathX = React.useCallback((y: number) => {
    const leftX = windowWidth < 768 ? 1.5 : 7.5; // left margin percentage (pushed to edge on mobile)
    const rightX = windowWidth < 768 ? 98.5 : 92.5; // right margin percentage (pushed to edge on mobile)
    const transitionWidth = 360; // vertical range (in px) over which the crossover happens

    if (sectionOffsets.length < 5) {
      // Fallback sinusoidal trail if section offsets are not loaded yet
      const wave = Math.sin(y * 0.002) * 42;
      return 50 + wave;
    }

    const [, yServices, yLocation, yTestimonials, yFAQ] = sectionOffsets;

    let basePercent = leftX;

    // Determine target side and interpolate crossing at section boundaries:
    // 1. Crossover 1 (Left to Right): at yServices boundary
    // 2. Crossover 2 (Right to Left): at yLocation boundary
    // 3. Crossover 3 (Left to Right): at yTestimonials boundary
    // 4. Crossover 4 (Right to Left): at yFAQ boundary

    if (y < yServices - transitionWidth / 2) {
      basePercent = leftX;
    } else if (y < yServices + transitionWidth / 2) {
      const t = (y - (yServices - transitionWidth / 2)) / transitionWidth;
      const smoothT = t * t * (3 - 2 * t);
      basePercent = leftX + (rightX - leftX) * smoothT;
    } else if (y < yLocation - transitionWidth / 2) {
      basePercent = rightX;
    } else if (y < yLocation + transitionWidth / 2) {
      const t = (y - (yLocation - transitionWidth / 2)) / transitionWidth;
      const smoothT = t * t * (3 - 2 * t);
      basePercent = rightX + (leftX - rightX) * smoothT;
    } else if (y < yTestimonials - transitionWidth / 2) {
      basePercent = leftX;
    } else if (y < yTestimonials + transitionWidth / 2) {
      const t = (y - (yTestimonials - transitionWidth / 2)) / transitionWidth;
      const smoothT = t * t * (3 - 2 * t);
      basePercent = leftX + (rightX - leftX) * smoothT;
    } else if (y < yFAQ - transitionWidth / 2) {
      basePercent = rightX;
    } else if (y < yFAQ + transitionWidth / 2) {
      const t = (y - (yFAQ - transitionWidth / 2)) / transitionWidth;
      const smoothT = t * t * (3 - 2 * t);
      basePercent = rightX + (leftX - rightX) * smoothT;
    } else {
      basePercent = leftX;
    }

    return basePercent;
  }, [sectionOffsets, windowWidth]);

  const paws = React.useMemo(() => {
    const list = [];
    const widthMultiplier = windowWidth;

    // Fine-grained sampling to trace the path and place paws at exact distance intervals
    const sampleStep = 5; // px
    let accumulatedDistance = 0;
    let isLeftFoot = true;
    let pawIndex = 0;

    // Start sampling at y = 180
    let lastXPercent = getPathX(180);
    let lastX = (lastXPercent / 100) * widthMultiplier;
    let lastY = 180;

    for (let currentY = 180; currentY < height; currentY += sampleStep) {
      const currentXPercent = getPathX(currentY);
      const currentX = (currentXPercent / 100) * widthMultiplier;

      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const stepDist = Math.sqrt(dx * dx + dy * dy);

      accumulatedDistance += stepDist;

      // Update last position for the next iteration
      lastX = currentX;
      lastY = currentY;

      if (accumulatedDistance >= pawSpacing) {
        // Place a paw!
        // Compute tangent vector for rotation/offset (using nextY = currentY + 15 for a smooth forward vector)
        const nextY = Math.min(height, currentY + 15);
        const nextXPercent = getPathX(nextY);
        const nextX = (nextXPercent / 100) * widthMultiplier;

        const tangentX = nextX - currentX;
        const tangentY = nextY - currentY;
        const length = Math.sqrt(tangentX * tangentX + tangentY * tangentY) || 1;

        // Unit tangent
        const tx = tangentX / length;
        const ty = tangentY / length;

        // Unit perpendicular (facing left of path direction)
        const perpX = -ty;
        const perpY = tx;

        // Determine side offset based on viewport width:
        const sideOffsetPx = windowWidth < 768 ? 6 : 24;

        const footSign = isLeftFoot ? -1 : 1;
        const offsetX = currentX + perpX * sideOffsetPx * footSign;
        const offsetY = currentY + perpY * sideOffsetPx * footSign;

        // Path angle relative to pointing up
        const pathAngle = Math.atan2(tangentX, -tangentY) * (180 / Math.PI);
        const footAngleOffset = isLeftFoot ? -8 : 8;
        const rotation = pathAngle + footAngleOffset;

        // Smaller sizing for mobile to keep them subtle and prevent overlaps
        const size = "w-[20px] h-[20px] md:w-[76px] md:h-[76px]";

        list.push({
          id: `paw-${pawIndex}`,
          x: `${(offsetX / widthMultiplier) * 100}%`,
          y: offsetY,
          rotation,
          size,
        });

        // Alternate foot
        isLeftFoot = !isLeftFoot;
        pawIndex++;

        // Reset accumulator (keeping the remainder for precision)
        accumulatedDistance -= pawSpacing;
      }
    }

    return list;
  }, [height, getPathX, pawSpacing, windowWidth]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-30"
      aria-hidden="true"
    >
      {paws.map((paw) => {
        // A paw is active when the scrollfront (bottom 80% of viewport) passes its absolute Y position
        const pawAbsoluteY = containerTop + paw.y;
        const scrollFront = scrollY + viewportHeight * 0.8;
        const isActive = scrollFront >= pawAbsoluteY;

        return (
          <motion.div
            key={paw.id}
            className="absolute text-brand-primary/20 md:text-brand-primary/50"
            style={{
              left: paw.x,
              top: paw.y,
              transformOrigin: "center center",
            }}
            initial="inactive"
            animate={isActive ? "active" : "inactive"}
            variants={{
              inactive: {
                opacity: 0,
                scale: 0.4,
                rotate: paw.rotation,
              },
              active: {
                opacity: [0, 0.75, 0.48], // quick step press (75% opacity), then settle to clean dark watermark (48% opacity)
                scale: [0.4, 1.2, 1], // spring press down effect
                rotate: paw.rotation,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                },
              },
            }}
          >
            <PawIcon className={paw.size} />
          </motion.div>
        );
      })}
    </div>
  );
}


