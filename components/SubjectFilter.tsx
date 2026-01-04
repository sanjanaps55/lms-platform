'use client';

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { subjects } from "@/constants";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSubject = searchParams.get('subject') || '';

    const handleSubjectChange = (value: string) => {
        if (value && value !== 'all') {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: value,
            });
            router.push(newUrl, { scroll: false });
        } else {
            const newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
            router.push(newUrl, { scroll: false });
        }
    };

    return (
        <Select
            value={currentSubject || 'all'}
            onValueChange={handleSubjectChange}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="capitalize">
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;