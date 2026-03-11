import { useCallback, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { SectionHeader } from "@/app/components/shared/section-header";

type PlaceType = "visited" | "bucket";

interface Place {
  name: string;
  country: string;
  coordinates: [number, number];
  type: PlaceType;
}

const MARKER_COLORS: Record<PlaceType, { default: string; hover: string; pulse: string }> = {
  visited: { default: "rgba(10,10,10,0.5)", hover: "#0a0a0a", pulse: "#0a0a0a" },
  bucket:  { default: "#c8392b",            hover: "#8b1a10", pulse: "#8b1a10" },
};

const PLACES: Place[] = [
  { name: "Madrid", country: "Spain", coordinates: [-3.7038, 40.4168], type: "visited" },
  { name: "Barcelona", country: "Spain", coordinates: [2.1734, 41.3851], type: "visited" },
  { name: "Paris", country: "France", coordinates: [2.3522, 48.8566], type: "visited" },
  { name: "Dublin", country: "Ireland", coordinates: [-6.2603, 53.3498], type: "visited" },
  { name: "London", country: "England", coordinates: [-0.1278, 51.5074], type: "visited" },
  { name: "Rome", country: "Italy", coordinates: [12.4964, 41.9028], type: "visited" },
  { name: "Berlin", country: "Germany", coordinates: [13.405, 52.52], type: "visited" },
  { name: "Munich", country: "Germany", coordinates: [11.582, 48.1351], type: "visited" },
  { name: "Budapest", country: "Hungary", coordinates: [19.0402, 47.4979], type: "visited" },
  { name: "Marrakesh", country: "Morocco", coordinates: [-7.9811, 31.6295], type: "visited" },
  { name: "New York", country: "United States", coordinates: [-74.006, 40.7128], type: "visited" },
  { name: "Athens", country: "Greece", coordinates: [23.7275, 37.9838], type: "visited" },
  { name: "Cairo", country: "Egypt", coordinates: [31.2357, 30.0444], type: "bucket" },
  { name: "Menorca", country: "Spain", coordinates: [4.0885, 39.9496], type: "bucket" },
  { name: "Tokyo", country: "Japan", coordinates: [139.6917, 35.6895], type: "bucket" },
  { name: "Florence", country: "Italy", coordinates: [11.2558, 43.7696], type: "bucket" },
];

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const DEFAULT_CENTER: [number, number] = [20, 20];
const DEFAULT_ZOOM = 1;
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;

export function TravelMap() {
  const [hovered, setHovered] = useState<Place | null>(null);
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
  });

  const handleZoomIn = useCallback(() => {
    setPosition((pos) => ({ ...pos, zoom: Math.min(pos.zoom * 1.5, MAX_ZOOM) }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setPosition((pos) => ({ ...pos, zoom: Math.max(pos.zoom / 1.5, MIN_ZOOM) }));
  }, []);

  const handleReset = useCallback(() => {
    setPosition({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });
  }, []);

  const handleMoveEnd = useCallback((pos: { coordinates: [number, number]; zoom: number }) => {
    setPosition(pos);
  }, []);

  return (
    <section id="travel" className="py-20" style={{ background: "#ffffff" }}>
      <div className="px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">

          <SectionHeader title="Places visited">
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: MARKER_COLORS.visited.default,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(10,10,10,0.55)", letterSpacing: "-0.01em" }}>
                  Visited
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: MARKER_COLORS.bucket.default,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(10,10,10,0.55)", letterSpacing: "-0.01em" }}>
                  Bucket list
                </span>
              </div>
            </div>
          </SectionHeader>

          {/* Map container */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              border: "1px solid rgba(10,10,10,0.08)",
              background: "#ffffff",
            }}
            onMouseLeave={() => setHovered(null)}
          >
            <ComposableMap
              projection="geoNaturalEarth1"
              projectionConfig={{
                scale: 160,
                center: [20, 20],
              }}
              width={900}
              height={420}
              style={{ width: "100%", height: "auto" }}
            >
              <ZoomableGroup
                center={position.coordinates}
                zoom={position.zoom}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
                onMoveEnd={handleMoveEnd}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="none"
                        stroke="rgba(10,10,10,0.15)"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {PLACES.map((place) => {
                  const isHov = hovered?.name === place.name;
                  const markerScale = 1 / position.zoom;
                  const colors = MARKER_COLORS[place.type];
                  return (
                    <Marker
                      key={place.name}
                      coordinates={place.coordinates}
                      onMouseEnter={() => setHovered(place)}
                    >
                      {isHov && (
                        <circle
                          r={10 * markerScale}
                          fill="none"
                          stroke={colors.pulse}
                          strokeWidth={1 * markerScale}
                          opacity={0.3}
                        >
                          <animate attributeName="r" from={`${6 * markerScale}`} to={`${14 * markerScale}`} dur="1.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle
                        r={(isHov ? 5 : 3.5) * markerScale}
                        fill={isHov ? colors.hover : colors.default}
                        stroke="#ffffff"
                        strokeWidth={1 * markerScale}
                        style={{ transition: "all 0.2s", cursor: "pointer" }}
                      />
                      {isHov && (
                        <g transform={`translate(0, ${-18 * markerScale}) scale(${markerScale})`}>
                          <rect
                            x={-40}
                            y={-24}
                            width={80}
                            height={28}
                            fill="#0a0a0a"
                            rx={0}
                          />
                          <text
                            textAnchor="middle"
                            y={-10}
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: "10px",
                              fontWeight: 500,
                              fill: "#ffffff",
                            }}
                          >
                            {place.name}
                          </text>
                          <text
                            textAnchor="middle"
                            y={0}
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: "8px",
                              fill: "rgba(245,240,232,0.5)",
                            }}
                          >
                            {place.country}
                          </text>
                        </g>
                      )}
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>

            {/* Zoom controls */}
            <div
              className="absolute bottom-4 right-4 flex flex-col gap-1"
              style={{ zIndex: 10 }}
            >
              <button
                onClick={handleZoomIn}
                aria-label="Zoom in"
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#0a0a0a",
                  border: "none",
                  cursor: "pointer",
                  color: "#f5f0e8",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <Plus size={14} />
              </button>
              <button
                onClick={handleZoomOut}
                aria-label="Zoom out"
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#0a0a0a",
                  border: "none",
                  cursor: "pointer",
                  color: "#f5f0e8",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <Minus size={14} />
              </button>
              <button
                onClick={handleReset}
                aria-label="Reset view"
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#0a0a0a",
                  border: "none",
                  cursor: "pointer",
                  color: "#f5f0e8",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </div>        </div>
      </div>
    </section>
  );
}
