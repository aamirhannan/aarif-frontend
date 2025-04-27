'use client'

import CauseDetails from "@/components/CauseDeatils";
import { ROLES } from '@/utils/validationSchemas';
import { useRouter } from "next/navigation";

const Cause = () => {
    const router = useRouter();

    const handleSponsorCause = (causeData) => {
        console.log(causeData);
        router.push(`/sponsor/${causeData.causeID}?createSponsor=true`);
    }
    return (
        <CauseDetails handleSponsorCause={handleSponsorCause} />
    );
};

export default Cause;
