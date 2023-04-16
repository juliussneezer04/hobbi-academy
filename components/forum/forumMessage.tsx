import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  DocumentDuplicateIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { classNames, generateAvatarSvg } from "@/lib/utils";
import { ForumMessage } from "@/interfaces";

export default function ForumMessageComponent(props: {
  message: ForumMessage;
}) {
  const { message } = props;
  const [showCopiedConfirmation, setShowCopiedConfirmation] = React.useState<
    boolean
  >(false);
  React.useEffect(() => {
    if (showCopiedConfirmation) {
      setTimeout(() => {
        setShowCopiedConfirmation(false);
      }, 1000);
    }
  }, [showCopiedConfirmation]);

  return (
    <div className="bg-white px-4 py-5 sm:px- shadow-md rounded-md">
      <div className="text-sm flex flex-col space-y-4">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={generateAvatarSvg(message.author)}
              alt="author DP"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900">
              <a href="#" className="hover:underline">
                {message.author}
              </a>
            </p>
          </div>
          <div className="flex flex-shrink-0 self-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    navigator.clipboard.writeText(message.content);
                    setShowCopiedConfirmation(true);
                  }}
                >
                  <span className="sr-only">Copy Message</span>
                  <DocumentDuplicateIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
                {showCopiedConfirmation && (
                  <div className="absolute right-0 mt-2 w-32 h-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <p className="text-xs text-gray-700 px-4">
                        <i>Message copied!</i>
                      </p>
                    </div>
                  </div>)}
              </div>
            </Menu>
          </div>
        </div>
        <p className="text-sm font-normal text-gray-900">
          <button disabled className="hover:underline">
            {message.content}
          </button>
        </p>
      </div>
    </div>
  );
}
