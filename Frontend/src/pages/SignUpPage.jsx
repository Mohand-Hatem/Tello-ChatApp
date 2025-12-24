import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { z } from "zod";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function SignUpPage() {
  const { isSigningUp, signup } = useAuthStore();

  const signUpSchema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .lowercase("Your email should be lowercase")
      .trim(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const SubmitForm = (formData) => {
    signup(formData);
    reset();
  };

  return (
    <div className=" flex items-center justify-center rounded-4xl bg-slate-900">
      <div className="relative w-full  lg:max-w-4xl md:h-155 ">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM CLOUMN - LEFT SIDE */}
            <div className=" md:w-1/2 p-8 flex items-center jذustify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}

                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(SubmitForm)} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon relative  " />

                      <input
                        type="text"
                        name="fullname"
                        {...register("fullname")}
                        className="input flex-1/2"
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.fullname && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.fullname.message}
                      </p>
                    )}
                  </div>

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        className="input"
                        name="email"
                        {...register("email")}
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        className="input"
                        placeholder="Enter your password"
                        name="password"
                        {...register("password")}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    className="auth-btn cursor-pointer"
                    type="submit"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-linear-to-bl from-slate-800/20 to-transparent">
              <div>
                <p className="mb-1 shadow-md mx-auto text-slate-200 text-3xl font-medium w-fit bg-cyan-400/50 px-2 py-1 rounded-lg">
                  Tello
                </p>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className=" text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Start Your Journey Today
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;
