"use client";

import Image from "next/image";
import { useState } from "react";

export default function CmsImage({ src, alt, ...props }) {
  const [failedSource, setFailedSource] = useState(null);
  const source = !src || failedSource === src ? "/ben-logo.png" : src;
  return <Image {...props} src={source} alt={alt || ""} unoptimized onError={() => setFailedSource(src)} />;
}
