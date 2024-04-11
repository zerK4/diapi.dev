import { ContentType } from "@/db/schema";
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
  data: ContentType;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{data.name}</SheetTitle>
        </SheetHeader>
        <div className='my-4'>{data.userId}</div>
      </SheetContent>
    </Sheet>
  );
};
