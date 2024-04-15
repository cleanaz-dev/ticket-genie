import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className=" flex mx-auto justify-center align-middle items-center h-[95vh]">
			{" "}
			<SignIn />
		</div>
	);
}
