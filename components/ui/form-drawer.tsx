import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

type IFormDrawerProps = {
    open: boolean;
    onClose: () => void;
    title: React.ReactNode;
    children?: React.ReactNode;
    drawerScollableDivID?: string
};

export default function FormDrawer({
 open, onClose, title, children, drawerScollableDivID,
}: IFormDrawerProps) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={onClose}>
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 blur-lg bg-gray-400 bg-opacity-60 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                        <Transition.Child
                          as={Fragment}
                          enter="transform transition ease-in-out duration-500 sm:duration-700"
                          enterFrom="translate-x-full"
                          enterTo="translate-x-0"
                          leave="transform transition ease-in-out duration-500 sm:duration-700"
                          leaveFrom="translate-x-0"
                          leaveTo="translate-x-full"
                        >
                            <div className="w-screen max-w-md">
                                <div className="h-full flex flex-col py-6 bg-gray-50 dark:bg-gray-950 shadow-xl overflow-y-scroll" id={drawerScollableDivID ?? undefined}>
                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium ">{title}</Dialog.Title>
                                            <div className="ml-3 h-7 flex items-center">
                                                <button
                                                  type="button"
                                                  className="rounded-md font-bold"
                                                  onClick={onClose}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
