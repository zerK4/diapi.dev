import { ContentType, FullContentType } from "@/db/schema";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const SettingsSheet = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: FullContentType;
}) => {
  console.log(data.apiKeys, "this is data");
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{data.name}</SheetTitle>
        </SheetHeader>
        <div className='my-4'>
          {data.apiKeys?.length === 0 ? <div>add</div> : <div>remove</div>}
        </div>
      </SheetContent>
    </Sheet>
  );
};
