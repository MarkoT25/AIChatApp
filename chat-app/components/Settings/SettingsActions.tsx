import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SettingsActions = ({ isUpdating }: { isUpdating: boolean }) => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-end gap-3">
      <Button
        variant="outline"
        type="button"
        onClick={() => router.back()}
        disabled={isUpdating}
        className="font-medium text-on-surface"
      >
        Cancel
      </Button>
      <Button
        variant="default"
        type="submit"
        disabled={isUpdating}
        className="font-medium text-on-surface"
      >
        {isUpdating ? "Updating.." : "Update"}
      </Button>
    </div>
  );
};

export default SettingsActions;
