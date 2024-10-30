import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";

export default function LinkPostInfo({ id }: { id: string }) {
  return (
    <Link
      href={`/post-list/post/${id}/post-info`}
      className="absolute top-0 right-0"
    >
      <RxHamburgerMenu size={40} />
    </Link>
  );
}
