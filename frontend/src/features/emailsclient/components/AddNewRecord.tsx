'use client';
import * as React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import toast, { Toaster } from 'react-hot-toast';
import { addNewRecord } from '../service/emails';
import { NewRecordEmailPayload } from '../type/type';
import { useRouter } from 'next/navigation';

interface SwissInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const SwissInput: React.FC<SwissInputProps> = ({
  id,
  label,
  type = "text",
  required = false,
  className,
  ...props
}) => {
  return (
    <div className="group relative border-b border-white/20 transition-colors duration-300 focus-within:border-white">
      <Input
        id={id}
        type={type}
        required={required}
        placeholder=" "
        className={cn(
          "peer h-auto w-full border-0 bg-transparent px-0 pt-8 pb-3 text-white transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0",
          /* --- AUTOFILL FIXES --- */
          // 1. Force the text color to stay white
          "[&:-webkit-autofill]:[-webkit-text-fill-color:white]",
          // 2. Use a huge inset shadow to "paint" the background black
          "[&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#0a0a0a_inset]",
          // 3. Keep the background transparent if possible
          "[&:-webkit-autofill]:bg-transparent",
          // 4. Ensure the transition doesn't flash white
          "[&:-webkit-autofill]:transition-[background-color]_5000s_ease-in-out_0s]",
          "autofill:rounded-none",
          "autofill:border-none",
          className
        )}
        {...props}
      />
      <Label
        htmlFor={id}
        className={cn(
          "absolute left-0 top-8 pointer-events-none transition-all duration-300 font-medium uppercase tracking-[0.2em] text-white/40",
          "peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-white/60",
          "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-white/60",

          /* Ensures the label stays small when browser autofills */
          "peer-autofill:top-2 peer-autofill:text-[10px] peer-autofill:text-white/60"
        )}
      >
        {label}
      </Label>
    </div>
  );
};

const IdentityForm: React.FC = () => {

  const router = useRouter();

  const handleToast = (email: string) => {
    toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {email}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                added! to my list!
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#787878]"
          >
            Close
          </button>
        </div>
      </div>
    ))
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: NewRecordEmailPayload = {
      createdDate: new Date().toISOString().split("T")[0],
      name: String(formData.get("fullName") ?? ""),
      company: String(formData.get("company") ?? ""),
      linkedin: String(formData.get("linkedin") ?? ""),
      number: String(formData.get("phonenumber") ?? ""),
      place: String(formData.get("location") ?? ""),
      email: String(formData.get("email") ?? ""),
    };
    try {
      await addNewRecord(payload);
      handleToast(payload.email);
      form.reset();
      router.push("/");
    } catch (err) {
      console.error("Submit failed", err);
    }
  };


  return (
    <div className="mx-4 my-12 text-white">
      <Toaster />
      <main className="w-full max-w-sm mx-auto mt-20 space-y-16">
        <header className="space-y-4">
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">
            CONNECT<br />IDENTITY
          </h1>
          <div className="h-1 w-12 bg-white" />
          <p className="text-white/50 font-medium tracking-tight text-lg leading-snug">
            Join the professional network of the future.
          </p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-4">
          <SwissInput
            id="email"
            name="email"
            label="Email Address"
            type="email"
            required
          />
          <SwissInput
            id="full-name"
            name="fullName"
            label="Full Name"
          />

          <SwissInput
            id="company"
            name="company"
            label="Company"
          />

          <SwissInput
            id="location"
            name="location"
            label="Location"
          />
          <SwissInput
            id="linkedin"
            name="linkedin"
            label="LinkedIn Profile"
            type="url"
          />
          <SwissInput
            id="phonenumber"
            name="phonenumber"
            label="Phone Number"
            type="tel"
          />
          <div className="pt-12">
            <Button
              type="submit"
              className="w-full bg-white text-black font-black text-xl py-8 rounded-none transition-all hover:bg-neutral-200 active:scale-[0.98] uppercase tracking-[0.2em]"
            >
              Add To List
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default IdentityForm;