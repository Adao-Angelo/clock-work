export default function PageNotFund() {
  return (
    <main className="dark:bg-zinc-900 bg-zinc-50 w-full p-[4rem] min-h-[100vh]  dark:text-zinc-50 text-zinc-900 flex justify-center items-center">
      <div className="p-[2rem] w-[40rem] text-center">
        <h1 className="text-[3rem] font-bold text-center font-roboto">
          Page Not Found
        </h1>
        <p className="text-2xl text-center mt-[2rem] mb-[4rem] font-roboto  ">
          The page you're looking for doesn't exist. Please try again.
        </p>
        <a
          href="/"
          className="text-2xl font-medium text-violet-700 dark:text-violet-400 hover:text-violet-400  dark:hover:text-violet-300 "
        >
          Go back to the home page
        </a>
      </div>
    </main>
  );
}
