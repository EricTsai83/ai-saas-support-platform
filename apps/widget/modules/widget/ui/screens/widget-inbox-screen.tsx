"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeftIcon } from "lucide-react";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  screenAtom,
} from "@/modules/widget/atoms/widget-atoms";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { WidgetFooter } from "@/modules/widget/ui/components/widget-footer";
import { Button } from "@workspace/ui/components/button";
import { api } from "@workspace/backend/_generated/api";
import { usePaginatedQuery } from "convex/react";

export const WidgetInboxScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId ?? ""),
  );

  const conversations = usePaginatedQuery(
    api.public.conversations.getMany,
    contactSessionId ? { contactSessionId } : "skip",
    {
      initialNumItems: 10,
    },
  );

  return (
    <>
      <WidgetHeader>
        <div className="flex items-center gap-x-2">
          <Button
            size="icon"
            variant="transparent"
            onClick={() => setScreen("selection")}
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
          <p>Inbox</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-col flex-1 gap-y-2 p-4 overflow-y-auto">
        {conversations.results?.map((conversation) => (
          <Button
            className="w-full h-20 justify-between"
            key={conversation._id}
            variant="outline"
            onClick={() => {
              setConversationId(conversation._id);
              setScreen("chat");
            }}
          >
            <div className="flex w-full flex-col gap-4 overflow-hidden text-start">
              <div className="flex w-full items-center justify-between gap-x-2">
                <p className="text-xs text-muted-foreground">Chat</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(conversation._creationTime))}
                </p>
              </div>
              <div className="flex w-full items-center justify-between gap-x-2">
                <p className="truncate text-sm">
                  {conversation.lastMessage?.text}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
      <WidgetFooter />
    </>
  );
};
