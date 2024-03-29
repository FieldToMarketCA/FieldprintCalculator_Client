export default function Footer() {
  return (
    <div className="w-full hidden min-[550px]:flex  bg-[#333333] flex items-center flex-col md:flex-row md:justify-between px-[79px]">
      <div className="flex items-center">
        <a
          href="https://fieldtomarketca.github.io/FieldprintCalculator_Client/"
          className="text-white no-underline text-[11px] hover:underline "
        >
          Data and Privacy Policy
        </a>
        <p className="text-white mx-2">|</p>
        <a
          href="https://fieldtomarketca.github.io/FieldprintCalculator_Client/"
          className="text-white no-underline text-[11px] hover:underline "
        >
          Terms of Use
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="https://fieldtomarketca.github.io/FieldprintCalculator_Client/"
          className="text-white no-underline text-[11px] hover:underline "
        >
          membership@fieldtomarket.ca
        </a>
        <p className="text-white mx-2">|</p>
        <a
          href="https://fieldtomarketca.github.io/FieldprintCalculator_Client/"
          className="text-white no-underline text-[11px] hover:underline "
        >
          www.fieldtomarket.ca
        </a>
      </div>
    </div>
  );
}
