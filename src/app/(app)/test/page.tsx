import SignIn from "@/app/(auth)/signin/page";
import { Modal } from "@/app/components/Modal";

export default async function Home() {
  return (
    <div className=" pt-[78px] flex flex-col gap-4">
      <Modal.Root>
        <Modal.Trigger>
          <div className="flex">
            <button
              type="button"
              className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-zinc-50 hover:bg-[#1f1f1f] text-[#143229]  hover:text-white px-8 py-3 text-2xl w-full"
            >
              <div className="flex flex-1 justify-center items-center gap-2">
                <span className="text-base leading-6 text-nowrap">
                  Começar periodo gratis
                </span>
              </div>
            </button>
          </div>
        </Modal.Trigger>
        <Modal.Content className="h-full">
          <SignIn />
        </Modal.Content>
      </Modal.Root>
    </div>
  );
}
