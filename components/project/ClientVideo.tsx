"use client";

export default function ClientVideo({
  src,
  onLoadedData,
}: {
  src: string;
  onLoadedData?: () => void;
  className?: string;
}) {
  return (
    <video
      autoPlay
      muted
      loop
      disableRemotePlayback
      playsInline
      className="pointer-events-none touch-none select-none w-full h-full object-cover group-hover:scale-[1.02] transition-all duration-200 ease-out"
      controlsList="noplaybackrate nodownload nofullscreen"
      disablePictureInPicture
      onLoadedData={onLoadedData}
    >
      <source src={src} />
      Your browser does not support HTML video
    </video>
  );
}
