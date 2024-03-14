"use client";

import useDefaultDomains from "@/lib/swr/use-default-domains";
import useDomains from "@/lib/swr/use-domains";
import useProject from "@/lib/swr/use-project";
import DomainCard from "@/ui/domains/domain-card";
import DomainCardPlaceholder from "@/ui/domains/domain-card-placeholder";
import NoDomainsPlaceholder from "@/ui/domains/no-domains-placeholder";
import { useAddEditDomainModal } from "@/ui/modals/add-edit-domain-modal";
import {
  Button,
  Checkbox,
  InfoTooltip,
  Label,
  MaxWidthWrapper,
  Popover,
  TooltipContent,
} from "@dub/ui";
import { DUB_DOMAINS, HOME_DOMAIN } from "@dub/utils";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProjectDomainsClient() {
  const { id: projectId } = useProject();

  const { AddEditDomainModal, AddDomainButton } = useAddEditDomainModal();
  const { activeProjectDomains, archivedProjectDomains } = useDomains();
  const [showArchivedDomains, setShowArchivedDomains] = useState(false);

  return (
    <>
      {projectId && <AddEditDomainModal />}
      <div className="flex h-36 items-center border-b border-gray-200 bg-white">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl text-gray-600">Domains</h1>
              <InfoTooltip
                content={
                  <TooltipContent
                    title="Learn more about how to add, configure, and verify custom domains on Dub."
                    href={`${HOME_DOMAIN}/help/article/how-to-add-custom-domain`}
                    target="_blank"
                    cta="Learn more"
                  />
                }
              />
            </div>
            <div className="flex">
              <AddDomainButton />
              <DefaultDomains />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className="py-10">
        {activeProjectDomains ? (
          activeProjectDomains.length > 0 ? (
            <ul className="grid grid-cols-1 gap-3">
              {activeProjectDomains.map((domain) => (
                <li key={domain.slug}>
                  <DomainCard props={domain} />
                </li>
              ))}
            </ul>
          ) : (
            <NoDomainsPlaceholder AddDomainButton={AddDomainButton} />
          )
        ) : (
          <DomainCardPlaceholder />
        )}
        {archivedProjectDomains && archivedProjectDomains.length > 0 && (
          <ul className="mt-3 grid grid-cols-1 gap-3">
            {showArchivedDomains &&
              archivedProjectDomains?.map((domain) => (
                <li key={domain.slug}>
                  <DomainCard props={domain} />
                </li>
              ))}
            <Button
              text={`${showArchivedDomains ? "Hide" : "Show"} ${
                archivedProjectDomains.length
              } archived domains`}
              variant="secondary"
              onClick={() => setShowArchivedDomains(!showArchivedDomains)}
            />
          </ul>
        )}
      </MaxWidthWrapper>
    </>
  );
}

const DefaultDomains = () => {
  const { slug } = useProject();
  const { defaultDomains: initialDefaultDomains, mutate } = useDefaultDomains();
  const [defaultDomains, setDefaultDomains] = useState<string[]>([]);
  useEffect(() => {
    if (initialDefaultDomains) {
      setDefaultDomains(initialDefaultDomains);
    }
  }, [initialDefaultDomains]);

  const [openPopover, setOpenPopover] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  return (
    <Popover
      content={
        <form
          className="w-full p-2 md:w-52"
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitting(true);
            fetch(`/api/domains/default?projectSlug=${slug}`, {
              method: "PUT",
              body: JSON.stringify({ defaultDomains }),
            }).then(async (res) => {
              setSubmitting(false);
              if (res.ok) {
                await mutate();
              } else {
                const error = await res.text();
                toast.error(error);
              }
            });
          }}
        >
          <div className="p-2 text-xs text-gray-500">Default Domains</div>
          {DUB_DOMAINS.map(({ slug }) => (
            <div
              key={slug}
              className="flex items-center space-x-2 rounded-md bg-white transition-all hover:bg-gray-50 active:bg-gray-100"
            >
              <Checkbox
                type="submit"
                id={slug}
                value={slug}
                disabled={submitting}
                className="ml-3"
                checked={defaultDomains.includes(slug)}
                onClick={() =>
                  setDefaultDomains((prev) =>
                    prev.includes(slug)
                      ? prev.filter((d) => d !== slug)
                      : [...prev, slug],
                  )
                }
              />
              <Label htmlFor={slug} className="flex-1 cursor-pointer p-3 pl-0">
                {slug}
              </Label>
            </div>
          ))}
        </form>
      }
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
      align="end"
    >
      <button
        onClick={() => setOpenPopover(!openPopover)}
        className="group ml-2 flex items-center justify-between space-x-2 rounded-md border border-gray-200 bg-white p-2.5 shadow transition-all duration-75"
      >
        <ChevronDown
          className={`h-4 w-4 shrink-0 ${
            openPopover ? "rotate-180 text-gray-700" : "text-gray-400"
          } transition-all group-hover:text-gray-700`}
        />
      </button>
    </Popover>
  );
};
