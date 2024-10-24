"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, forwardRef, useEffect, useState } from "react";
import { ErrorHandler } from "./utils";
import useStore from "@/useStore";
import { State } from "@/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { plombContract } from "@/constant";
import { abi } from "@/abi";
import toast from "react-hot-toast";
// import { ChevronLeft, ChevronRight } from "lucide-react";

const Admin = () => {
  const updateVoteInfo = useStore((state: any) => state.updateVoteInfo);
  const voteinfo = useStore((state: any) => state.voteinfo);
  const [currentParticipant, setCurrentParticipant] = useState(0);

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const DateInput = forwardRef((props: any, ref) => (
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

  console.log(voteinfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<State["voteinfo"]>();

  const onSubmit: SubmitHandler<State["voteinfo"]> = async () => {
    try {
      writeContract({
        address: plombContract,
        abi,
        functionName: "createElection",
        args: [
          voteinfo.pollTitle,
          voteinfo.country,
          voteinfo.startTime,
          voteinfo.endTime,
          voteinfo.candidates,
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

      updateVoteInfo({
        ...voteinfo,
        candidates: voteinfo.candidates.map((candidate: any, index: number) =>
          index === currentParticipant
            ? { ...candidate, ipfsHash: resData.IpfsHash }
            : candidate
        ),
      });
    } catch (e) {
      alert("Trouble uploading file");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | Date | null,
    name?: string
  ) => {
    if (e instanceof Date) {
      if (name) {
        updateVoteInfo({
          ...voteinfo,
          [name]: Math.floor(e.getTime() / 1000),
        });
      }
    } else if (e && "target" in e) {
      const { name, value } = e.target;

      if (name === "participantsNum") {
        let num = parseInt(value);
        // Ensure `num` is a valid number, non-negative, and greater than 0
        if (isNaN(num) || num < 0) {
          num = 0;
        }

        updateVoteInfo({
          ...voteinfo,
          [name]: num,
          candidates: Array(num)
            .fill({ name: "", ipfsHash: "" }) // Fill array with default objects
            .map((candidate, i) => voteinfo.candidates[i] || candidate),
        });
      } else if (name === "participantName") {
        updateVoteInfo({
          ...voteinfo,
          candidates: voteinfo.candidates.map((candidate: any, index: number) =>
            index === currentParticipant
              ? { ...candidate, name: value }
              : candidate
          ),
        });
      } else {
        updateVoteInfo({
          ...voteinfo,
          [name]: value,
        });
      }
    }
  };

  const nextParticipant = () => {
    setCurrentParticipant((prev) =>
      Math.min(prev + 1, voteinfo.participantsNum - 1)
    );
  };

  const prevParticipant = () => {
    setCurrentParticipant((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-[#252525] text-white">
      <section className="md:mx-52 pt-20 mx-4 ">
        <h1 className="text-[#00ACE3] text-2xl text-center font-semibold">
          Admin Dashboard
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <form onSubmit={handleSubmit}  > */}
          {/* Row 1 */}
          <div className="flex flex-col gap-3 lg:gap-5 basis-1/2">
            <label className="lg:text-xl mb-2">
              Poll Title <span className="text-red-400">*</span>
            </label>
            <div>
              <input
                {...register("pollTitle", {
                  required: true,
                })}
                className="bg-[#333333] px-5 focus:border-[#00ACE3] focus:border-2 border-0 outline-none bg-hero w-full placeholder:text-neutral-500 py-4 rounded-3xl"
                placeholder="Enter your poll title "
                onChange={handleChange}
                defaultValue={voteinfo.pollTitle}
              />
            </div>
            <ErrorHandler
              error={errors.pollTitle?.type}
              patternMessage="Poll title is required"
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
                    pattern: /^\d+$/,
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
                defaultValue={voteinfo?.country || "---"}
                className="bg-[#333333] px-5 focus:border-[#00ACE3] focus:border-2 border-0 outline-none bg-hero w-full placeholder:text-neutral-500 py-4 rounded-3xl"
                {...register("country", {
                  required: "Country selection is required",
                })}
                onChange={(e: any) => {
                  handleChange(e);
                }}
              >
                <option value="---">-- Choose country --</option>
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
                      onChange={(date) => {
                        onChange(date);
                        handleChange(date, "startTime");
                      }}
                      customInput={<DateInput />}
                      placeholderText="XX - XX - XXXX - 00:00"
                      clearButtonClassName="w-10 h-8"
                      isClearable
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      filterTime={filterPassedTime}
                      minDate={new Date()}
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
                      onChange={(date: Date | null) => {
                        onChange(date);
                        handleChange(date, "endTime");
                      }}
                      customInput={<DateInput />}
                      placeholderText="XX - XX - XXXX - 00:00"
                      clearButtonClassName="w-10 h-8"
                      isClearable
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      filterTime={filterPassedTime}
                      minDate={getValues("startTime") || new Date()}
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

          {voteinfo.participantsNum > 0 && (
            <div className="flex flex-col items-center gap-6">
              <div className="flex justify-between items-center w-full">
                <button
                  type="button"
                  onClick={prevParticipant}
                  disabled={currentParticipant === 0}
                  className="text-3xl text-[#00ACE3] disabled:opacity-50"
                  aria-label="Previous participant"
                >
                  ==={/* <ChevronLeft className="h-8 w-8" /> */}
                </button>
                <span className="text-xl">
                  Participant {currentParticipant + 1} of{" "}
                  {voteinfo.participantsNum}
                </span>
                <button
                  type="button"
                  onClick={nextParticipant}
                  disabled={currentParticipant === voteinfo.participantsNum - 1}
                  className="text-3xl text-[#00ACE3] disabled:opacity-50"
                  aria-label="Next participant"
                >
                  &gt; {/* <ChevronRight className="h-8 w-8" /> */}
                </button>
              </div>

              <div className="flex justify-between w-full gap-12">
                <div className="flex flex-col  self-center gap-3 lg:gap-5 basis-1/2">
                  <label className="lg:text-xl mb-2">
                    Name of Participant<span className="text-red-400">*</span>
                  </label>
                  <div>
                    <input
                      {...register(`candidates.${currentParticipant}.name`, {
                        required: true,
                      })}
                      className="bg-[#333333] px-5 focus:border-[#00ACE3] focus:border-2 border-0 outline-none bg-hero w-full placeholder:text-neutral-500 py-4 rounded-3xl"
                      placeholder="Enter Name of Participant"
                      value={
                        voteinfo.candidates[currentParticipant]?.name || ""
                      }
                      onChange={handleChange}
                      name="participantName"
                    />
                  </div>
                  <ErrorHandler
                    error={errors.candidates?.[currentParticipant]?.name?.type}
                    patternMessage="Participant name is required"
                    message={
                      errors.candidates?.[currentParticipant]?.name?.message
                    }
                  />
                </div>

                <div className="flex flex-col gap-3 basis-1/2">
                  {voteinfo.candidates[currentParticipant]?.ipfsHash && (
                    <img
                      src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${voteinfo.candidates[currentParticipant].ipfsHash}`}
                      alt={`Participant ${currentParticipant + 1}`}
                      className="w-[300px] h-[300px] rounded-md"
                    />
                  )}
                  <label className="cursor-pointer" htmlFor="image">
                    <div className="flex flex-col justify-center items-center bg-[#333333] px-12 py-6 rounded-md">
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
                      <span>Upload Participant Image</span>
                    </div>
                  </label>
                  <input
                    onChange={changeHandler}
                    id="image"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    style={{ display: "none" }}
                    className="file w-[300px] self-center h-[300px] rounded-md"
                  />
                  <small className="text-[#ACACAC]">
                    Files Supported: png, jpg, jpeg, webp
                  </small>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-24 gap-4">
            <button
              // type="submit"
              className="bg-[#00ACE3] px-4 py-2 rounded-md font-semibold"
            >
              Create Poll
            </button>
            <button
              type="button"
              className="bg-[#333333] px-4 py-2 rounded-md font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Admin;
