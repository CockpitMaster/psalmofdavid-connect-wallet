import Link from "next/link";

export const Disclaimer = () => {
  return (
    <div className="mt-2">
      <p className="text-base text-black-500 leading-5 mt-6">
        By connecting a wallet, you agree to Neptune Mutual
        <Link href="#">
          <a className="text-blue-400"> Terms &amp; Conditions </a>
        </Link>
        and acknowledge that you have read and understand the Neptune Mutual
        Protocol Disclaimer.
      </p>
    </div>
  );
};
