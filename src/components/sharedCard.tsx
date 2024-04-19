import { ContentType, FullContentType } from "@/db/schema";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import Link from "next/link";

export const SharedCard = ({ data }: { data: ContentType }) => {
  return (
    <Card className="w-fit rounded-xl flex flex-col gap-1">
      <div className="px-4 py-4 pb-2">
        <Link href={`/books/${data.id}`} className="">
          <span className="">{data.name}</span>
        </Link>
      </div>
      <Separator />
      <div className="px-4 py-2 flex flex-col gap-1">
        <span className="">Reads: {data.reads}</span>
        <span className="">Writes: {data.writes}</span>
      </div>
    </Card>
  );
};
