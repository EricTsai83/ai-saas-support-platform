"use client";

import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen";
import { useAtomValue } from "jotai";
import { screenAtom } from "@/modules/widget/atoms/widget-atioms";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <p>TOTO: Error</p>,
    loading: <p>TOTO: Loading</p>,
    auth: <WidgetAuthScreen />,
    voice: <p>TOTO: Voice</p>,
    inbox: <p>TOTO: Inbox</p>,
    selection: <p>TOTO: Selection</p>,
    chat: <p>TOTO: Chat</p>,
    contact: <p>TOTO: Contact</p>,
  };
  return (
    <main className="min-h-svh min-w-svw flex flex-col w-full h-full overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
};
