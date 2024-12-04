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
  import { deleteGoal, fetchGoals } from "@/setup/api/log.api";
  import { GenericProps, Goal } from "@/setup/types";
  import { FC, useEffect, useState, forwardRef, useImperativeHandle } from "react";
  import Loading from "./ui/loading";
  import { BadgeX } from "lucide-react";
  
const GoalHistory = forwardRef<{ loadGoals: () => void }, GenericProps>(({ loggedInUser }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [goals, setGoals] = useState<Goal[]>([]);
  
    const loadGoals = () => {
      fetchGoals(loggedInUser.id)
        .then((data) => {
            setGoals(data!);
        })
        .catch((error) => {
          setGoals([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  
    useEffect(() => {
      loadGoals();
    }, []);
  
    useImperativeHandle(ref, () => ({
      loadGoals,
    }));
  
    if (goals.length === 0) {
        return <p>No goals founds</p>;
    }
  
    if (isLoading) {
      <Loading />;
    }
  
    const handleDelete = async (id: string) => {
      await deleteGoal(id);
  
      loadGoals();
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
          {goals.map(({ id, type, timestamp, target}) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{type}</TableCell>
              <TableCell>{target}</TableCell>
              <TableCell>
                <BadgeX className="h-4 w-4 cursor-pointer text-red-500" onClick={() => handleDelete(id!)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  });
  
export default GoalHistory;
