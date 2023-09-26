import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { getFromLocalStorage } from "../utils";
import { signOut } from "../libs/auth";

export default function UserLoggedbutton() {
	const navigate = useNavigate();
	const credential = JSON.parse(getFromLocalStorage("credential") as string);

	const handleSignOut = () => {
		signOut(() => navigate("/"));
	};

	return (
		<div className="relative w-full max-w-sm px-4">
			<Popover className="relative">
				{({ open }) => (
					<>
						<Popover.Button
							className={`
                ${open ? "" : "text-opacity-90"}
               flex items-center gap-3 focus:outline-none`}>
							<img
								className="w-10 h-10 rounded-full bg-blue-500"
								src={`https://ui-avatars.com/api/?name=${credential?.name}&background=random`}
							/>
							<span>{credential?.name}</span>
							<ChevronDownIcon
								className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
								aria-hidden="true"
							/>
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1">
							<Popover.Panel className="absolute z-10 mt-4 w-[150px] max-w-sm transform px-4 sm:px-0 lg:max-w-3xl">
								<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
									<div className="relative grid gap-8 bg-white py-3  text-black ">
										<button
											onClick={handleSignOut}
											className="text-red-500 font-bold w-full border-b-2 pb-2  px-3">
											Logout
										</button>
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	);
}
