export default function Footer() {
  return (
    <div className="w-full min-h-[32.5px] bg-[#333333] flex items-center flex-col md:flex-row md:justify-between px-[79px]">
      <div className="flex items-center">
        <a
          href="/"
          className="text-white no-underline text-[11px] hover:underline "
        >
          Data and Privacy Policy
        </a>
        <p className="text-white mx-2">|</p>
        <a
          href="/"
          className="text-white no-underline text-[11px] hover:underline "
        >
          Terms of Use
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="/"
          className="text-white no-underline text-[11px] hover:underline "
        >
          support@fieldtomarket.org
        </a>
        <p className="text-white mx-2">|</p>
        <a
          href="/"
          className="text-white no-underline text-[11px] hover:underline "
        >
          www.fieldtomarket.org
        </a>
      </div>
    </div>
  );
}
