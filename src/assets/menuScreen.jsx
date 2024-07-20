import * as React from "react";

function Menu() {
  return (
    <div className="flex flex-col justify-center bg-white max-w-[360px]">
      <div className="flex flex-col items-center px-6 pt-4 pb-20 w-full bg-sky-300">
        <div className="flex gap-5 justify-between items-center self-stretch w-full text-xl">
          <div className="self-stretch my-auto text-6xl text-center text-red-600">
            ❤️
          </div>
          <div className="flex gap-1 self-stretch my-auto text-black">
            <div className="grow my-auto">1337 </div>
            <img
              loading="lazy"
              srcSet="..."
              className="shrink-0 aspect-square w-[30px]"
            />
          </div>
          <div className="flex overflow-hidden relative flex-col justify-center items-start self-stretch px-5 py-6 whitespace-nowrap aspect-square text-stone-50 w-[62px]">
            <img
              loading="lazy"
              srcSet="..."
              className="object-cover absolute inset-0 size-full"
            />
            12
          </div>
        </div>
        <div className="mt-10 text-xs text-black">
          “Life makes sense as long <br />
          as you safe people” <br />- Oskar Schindler
        </div>
        <div className="flex overflow-hidden relative flex-col px-3 py-1 mt-7 w-full aspect-[2.12] max-w-[297px]">
          <img
            loading="lazy"
            srcSet="..."
            className="object-cover absolute inset-0 size-full"
          />
          <div className="relative text-sm text-white">DONATE</div>
          <div className="flex relative flex-col py-2 mt-4 text-black bg-stone-400">
            <div className="self-center text-sm">Malaria Consortium</div>
            <div className="mt-2 text-xs">
              It takes 7 $ to protect a child from Malaria. Almost 600.000{" "}
              <br />
              people (mostly children under the age of 5) die from it each
              <br />
              year. Malaria Consortium fights it using Anti-insecticide nets,
              <br />
              preventive medecine for vulnerable groubs and also by consul-
              <br />
              ting government about how to implement effecitive measures.
              <br />
            </div>
          </div>
          <div className="flex relative gap-5 justify-between items-start self-end max-w-full text-xs w-[178px]">
            <div className="justify-center px-2 py-1.5 text-black bg-white">
              DONATE NOW
            </div>
            <div className="flex gap-0.5 mt-2.5 text-white whitespace-nowrap">
              <div className="grow">+10</div>
              <img
                loading="lazy"
                srcSet="..."
                className="shrink-0 w-2.5 aspect-square"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col px-3.5 pt-6 pb-3.5 mt-3 w-full text-sm text-black whitespace-nowrap bg-white max-w-[297px]">
          <div className="self-center">COURSES</div>
          <div className="shrink-0 mt-2.5 bg-stone-400 h-[85px]" />
        </div>
        <div className="items-center px-16 pt-4 pb-24 mt-3 w-full text-sm text-black whitespace-nowrap bg-white max-w-[297px]">
          PERSONAL
        </div>
        <div className="flex gap-5 justify-between mt-12 max-w-full w-[238px]">
          <img
            loading="lazy"
            srcSet="..."
            className="shrink-0 my-auto aspect-[0.97] w-[30px]"
          />
          <img
            loading="lazy"
            srcSet="..."
            className="shrink-0 aspect-square w-[43px]"
          />
          <img
            loading="lazy"
            srcSet="..."
            className="shrink-0 aspect-square w-[43px]"
          />
        </div>
      </div>
    </div>
  );
}