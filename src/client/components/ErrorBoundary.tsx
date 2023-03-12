import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error: any = useRouteError();
  console.log(error);
  return (
    <main className="flex items-center justify-center h-screen flex-col gap-5">
      <div className="flex flex-row gap-2 items-center">
        <h1 className="text-6xl font-bold">{error.status}</h1>
        <p>{error.statusText}</p>
      </div>
      <p className="text-gray-400">{error.message}</p>
    </main>
  );
}

export default ErrorBoundary;
