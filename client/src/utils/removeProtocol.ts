export default function removeProtocol(url: string) {
  return url.replace(/^https?:\/\//, "");
}
