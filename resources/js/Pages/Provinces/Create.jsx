/**
 * teachasgreywolf
 * May 17, 2024
 */

import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { titleCase } from "@/lib/util";
import LabelEx from "@/Components/LabelEx";
import InputError from "@/Components/InputError";
import AddRegion from "@/Components/AddResource/AddRegion";
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
import { Textarea } from "@/shadcn/ui/textarea";
import { Label } from "@/shadcn/ui/label";

const Create = ({ resourceName, regions }) => {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        description: "",
        region_id: "",
        created_by: auth.user.id,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("provinces.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog className="bg-slate-400" open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 rounded-full hover:bg-blue-500 px-10">
                    Create {titleCase(resourceName)}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-none">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>
                            Create {titleCase(resourceName)}
                        </DialogTitle>
                    </DialogHeader>

                    <Separator className="h-[1px] my-4 bg-slate-500" />

                    <div className="grid gap-4 mb-7 pt-3">
                        <div className="">
                            {/* prettier-ignore */}
                            <LabelEx htmlFor="name" required>Name</LabelEx>

                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                type="text"
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
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

                        <div className="">
                            {/* prettier-ignore */}
                            <div className="relative">
                                <LabelEx htmlFor="region" required>Region</LabelEx>

                                <AddRegion resourceName="region" />
                            </div>

                            <select
                                value={data.region_id}
                                onChange={(e) =>
                                    setData("region_id", e.target.value)
                                }
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Select a region</option>
                                {Object.keys(regions).map((key) => (
                                    <option
                                        value={regions[key]}
                                        key={regions[key]}
                                    >
                                        {key}
                                    </option>
                                ))}
                            </select>

                            <InputError
                                message={errors.region_id}
                                className="mt-2"
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
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Create;
