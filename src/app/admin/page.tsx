"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, forwardRef, useEffect, useState } from "react";
import { ErrorHandler } from "./utils";
import useStore from "@/useStore";
import { State } from "@/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { plombContract } from "@/constant";
import { abi } from "@/abi";
import toast from "react-hot-toast";

const Admin = () => {
  const updateVoteInfo = useStore((state: any) => state.updateVoteInfo);
  const voteinfo = useStore((State: any) => State.voteinfo);

  const { address } = useAccount();
  // const [ipfsHash, setIpfsHash] = useState<string>("");

  console.log(voteinfo);

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const DateInput = forwardRef((props: any, ref) => (
    // <InputDecorator>
    <div className="relative w-full">
      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-6 h-6" />
      <input
        {...props}
        value={props.value}
        ref={ref}
        className="bg-[#333333] pl-12 pr-5 focus:border-[#00ACE3] focus:border-2 placeholder:text-neutral-500 w-full py-4 border-0 outline-none rounded-3xl placeholder:text-lg font-space"
      />
    </div>
  ));

  DateInput.displayName = "DateInput";

  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const {
    register,
    formState: { errors },
    getValues,
    control,
  } = useForm<State["voteinfo"]>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Submitting vote...", { id: "voteSubmission" });

    try {
      await writeContract({
        address: plombContract,
        abi,
        functionName: "createElection",
        args: [
          voteinfo.pollTitle,
          voteinfo.country,
          voteinfo.startTime,
          voteinfo.endTime,
          [voteinfo.participantName, voteinfo.participantImages],
        ],
      });
    } catch (error) {
      console.error("Error submitting vote:", error);
      toast.error("Failed to submit vote. Please try again.", {
        id: "voteSubmission",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Vote submitted successfully!", { id: "voteSubmission" });
    } else if (isLoading) {
      toast.loading("Processing transaction...", { id: "voteSubmission" });
    }
  }, [isLoading, isSuccess]);

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      await handleSubmission(selectedFile);
    }
  };

  const handleSubmission = async (fileToUpload: string | Blob) => {
    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
          body: formData,
        }
      );

      const resData = await res.json();

      updateVoteInfo({ ...voteinfo, participantImages: resData.IpfsHash });
      console.log(resData.IpfsHash);
    } catch (e) {
      // console.log(e);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateVoteInfo({
      ...voteinfo,
      [name]: value, // Update specific field dynamically
    });
  };

  return (
    <div className="bg-[#252525] text-white">
      <section className="md:mx-52 pt-20 mx-4 ">
        <h1 className="text-[#00ACE3] text-2xl text-center font-semibold">
          Admin Dashboard
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="flex flex-col gap-3 lg:gap-5 basis-1/2">
            <label className="lg:text-xl mb-2">
              Poll Title <span className="text-red-400">*</span>
            </label>
            <div>
              <input
                {...register("pollTitle", {
                  required: true,
                  pattern: /^\d+(\.\d+)?$/,
                })}
                className="bg-[#333333] px-5 focus:border-[#00ACE3] focus:border-2 border-0 outline-none bg-hero w-full placeholder:text-neutral-500 py-4 rounded-3xl"
                placeholder="Enter your poll title "
                onChange={handleChange}
                defaultValue={voteinfo.pollTitle}
              />
            </div>
            <ErrorHandler
              error={errors.pollTitle?.type}
              patternMessage="Number input is required"
              message={errors.pollTitle?.message}
            />
          </div>

          {/* Row 2 */}
          <div className=" justify-between flex mt-10  md:gap-20 gap-10">
            <div className="flex flex-col gap-3 lg:gap-5 basis-1/2">
              <label className="lg:text-xl mb-2">
                Number of Participants <span className="text-red-400">*</span>
              </label>
              <div>
                <input
                  {...register("participantsNum", {
                    required: true,
                    pattern: /^\d+(\.\d+)?$/,
                    min: 1,
                  })}
                  className="bg-[#333333] px-5 focus:border-[#00ACE3] focus:border-2 border-0 outline-none bg-hero w-full placeholder:text-neutral-500 py-4 rounded-3xl"
                  placeholder="Enter the number of participants"
                  onChange={handleChange}
                  defaultValue={voteinfo.participantsNum}
                />
              </div>
              <ErrorHandler
                error={errors.participantsNum?.type}
                patternMessage="Number input is required"
                message={errors.participantsNum?.message}
              />
            </div>

            <div className="flex flex-col gap-3 lg:gap-5 basis-1/2">
              <label className="lg:text-xl mb-2">
                Country<span className="text-red-400">*</span>
              </label>
              <select
                id="country"
                defaultValue={
                  voteinfo?.country || "---"
                } /* Ensure default value is set safely */
                className="bg-[#333333] px-5 focus:border-[#00ACE3] focus:border-2 border-0 outline-none bg-hero w-full placeholder:text-neutral-500 py-4 rounded-3xl"
                {...register("country", {
                  required: "Country selection is required",
                })} // Register for validation
                onChange={(e: any) => {
                  handleChange(e); // Update the voteinfo state on change
                }}
              >
                <option value="---">---</option>
                <option value="Nigeria">Nigeria</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
              </select>
              <ErrorHandler
                error={errors?.country?.type}
                patternMessage="Country selection is required"
                message={errors.country?.message}
              />
            </div>
          </div>

          {/* Row 3 */}
          <h1 className="lg:text-xl text-[#00ACE3] my-5">
            Start and end time of Vote
          </h1>

          <div className="flex flex-col sm:flex-row justify-between gap-3 lg:gap-20">
            <div className="flex flex-col gap-3 lg:gap-5 basis-1/2">
              <label className="lg:text-x">
                Start time <span className="text-red-400">*</span>
              </label>
              <Controller
                name="startTime"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <DatePicker
                      selected={value}
                      // onChange={onChange}
                      onChange={(date) => onChange(date)}
                      customInput={<DateInput />}
                      placeholderText="XX - XX - XXXX - 00:00"
                      clearButtonClassName="w-10 h-8"
                      isClearable
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      filterTime={filterPassedTime}
                    />
                  );
                }}
              />
              <ErrorHandler error={errors.startTime?.type} />
            </div>
            <div className="flex flex-col gap-3 lg:gap-5 basis-1/2">
              <label className="lg:text-x">
                End time <span className="text-red-400">*</span>
              </label>
              <Controller
                name="endTime"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    let startTimeEpoch = Math.floor(
                      getValues("startTime").getTime() / 1000
                    );
                    let _value = Math.floor(value.getTime() / 1000);
                    return (
                      _value > startTimeEpoch ||
                      "vote selected time should be greater than the start time"
                    );
                  },
                }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <DatePicker
                      selected={value}
                      onChange={onChange}
                      customInput={<DateInput />}
                      placeholderText="XX - XX - XXXX - 00:00"
                      clearButtonClassName="w-10 h-8"
                      isClearable
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      filterTime={filterPassedTime}
                    />
                  );
                }}
              />
              <ErrorHandler
                error={errors.endTime?.type}
                message={errors.endTime?.message}
              />
            </div>
          </div>

          <h3 className="text-[#00ACE3] mt-14 font-semibold text-center text-3xl mb-6">
            Register Participants
          </h3>

          <div className="flex gap-6">
            <button className="left-btn text-3xl text-[#00ACE3]  md:w-[5%] md:-ml-20  md:mr-4 ">
              &lt;
            </button>

            <div className="flex justify-between md:w-[100%] mx-4 md:mx-0 gap-12">
              <div className="flex flex-col self-center gap-3 lg:gap-5 basis-1/2">
                <label className="lg:text-xl mb-2">
                  Name of Participants<span className="text-red-400">*</span>
                </label>
                <div>
                  <input
                    {...register("participantName", {
                      required: true,
                      pattern: /^\d+(\.\d+)?$/,
                    })}
                    className="bg-[#333333] px-5 focus:border-[#00ACE3] focus:border-2 border-0 outline-none bg-hero w-full placeholder:text-neutral-500 py-4 rounded-3xl"
                    placeholder="Enter Name of Participant"
                    defaultValue={voteinfo.participants}
                    onChange={handleChange}
                  />
                </div>
                <ErrorHandler
                  error={errors.participantName?.type}
                  patternMessage="Number input is required"
                  message={errors.participantName?.message}
                />
              </div>

              {/* Participants Image */}
              <div>
                {voteinfo.participantImages !== "" && (
                  <img
                    src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${voteinfo.participantImages}`}
                    alt="image"
                    className="w-[300px] h-[300px] object-fit"
                  />
                )}
                <label className="mb-2" htmlFor="image">
                  Upload Participant Images
                  <div className="flex cursor-pointer flex-col justify-center items-center bg-[#333333] md:px-12 md:py-6 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="size-8 mb-2 text-[#00ACE3]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </div>
                </label>
                <div>
                  <input
                    onChange={changeHandler}
                    id="image"
                    type="file"
                    accept="image/png, image/jpg, image/webp"
                    style={{ display: "none" }}
                    className="file"
                  />
                  <p className="text-[#ACACAC]"></p>
                  <small>Files Supported: png, jpg, jpeg, webp</small>
                </div>
              </div>
            </div>
            <button className="right-btn text-3xl text-[#00ACE3]  md:w-[5%] md:-mr-20 md:ml-4">
              &gt;
            </button>
          </div>

          <div className="flex justify-end mt-24 gap-4">
            <button
              type="submit"
              className="bg-[#00ACE3] px-4 py-2 rounded-md font-semibold"
            >
              Create Poll
            </button>
            <button className="bg-[#333333] px-4 py-2 rounded-md font-semibold">
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Admin;
