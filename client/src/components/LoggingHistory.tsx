import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteLog, fetchLogs } from "@/setup/api/log.api";
import { GenericProps, Log } from "@/setup/types";
import { FC, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import Loading from "./ui/loading";
import { BadgeX } from "lucide-react";

const LoggingHistory = forwardRef<{ reloadLogs: () => void }, GenericProps>(({ loggedInUser }, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState<Log[]>([]);

  const loadLogs = () => {
    fetchLogs(loggedInUser.id)
      .then((data) => {
        setLogs(data!);
      })
      .catch((error) => {
        setLogs([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadLogs();
  }, []);

  useImperativeHandle(ref, () => ({
    reloadLogs: loadLogs,
  }));

  if (logs.length === 0) {
    return <p>No logs founds</p>;
  }

  if (isLoading) {
    <Loading />;
  }

  const handleDelete = async (id: string) => {
    await deleteLog(id);

    loadLogs();
  };

  return (
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Type</TableHead>
          <TableHead>Details</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map(({ id, type, timestamp, details: { value } }) => (
          <TableRow key={id}>
            <TableCell className="font-medium">{type}</TableCell>
            <TableCell>{value}</TableCell>
            <TableCell>
              <BadgeX className="h-4 w-4 cursor-pointer text-red-500" onClick={() => handleDelete(id!)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default LoggingHistory;
