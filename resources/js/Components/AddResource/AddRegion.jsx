/**
 * teachasgreywolf
 * May 17, 2024
 */

import { Link, useForm, usePage } from "@inertiajs/react";
import { CirclePlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { titleCase } from "@/lib/util";
import InputError from "../InputError";
import LabelEx from "../LabelEx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Textarea } from "@/shadcn/ui/textarea";

const AddRegion = ({ resourceName, setRevalidate = null }) => {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        description: "",
        created_by: auth.user.id,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("add.region"), {
            onSuccess: () => {
                reset();
                setOpen(false);

                if (setRevalidate) {
                    setRevalidate({
                        region: true,
                        province: false,
                        city: false,
                    });
                }
            },
        });
    };

    return (
        <Dialog className="bg-slate-400" open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="absolute top-0 right-0 bg-transparent border-none p-0 pb-2 shadow-none hover:bg-transparent">
                    <CirclePlus className="w-5 text-black dark:text-white" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-none">
                <DialogHeader>
                    <DialogTitle>Create {titleCase(resourceName)}</DialogTitle>
                </DialogHeader>

                <Separator className="h-[1px] my-4 bg-slate-500" />

                <div className="grid gap-4 mb-7 pt-3">
                    <div className="">
                        {/* prettier-ignore */}
                        <LabelEx htmlFor="name" required>Name</LabelEx>

                        <Input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            type="text"
                            className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="">
                        <Label htmlFor="description">Description</Label>

                        <Textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                </div>

                {/* prettier-ignore */}
                <DialogFooter>
                    {processing
                        ? (
                            <Button disabled className="rounded-full w-40">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                                Creating...
                            </Button>
                        )
                        : (
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-500 rounded-full w-40"
                                onClick={e => onSubmit(e)}
                            >
                                Save
                            </Button>
                        )}

                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className="rounded-full w-40">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddRegion;
