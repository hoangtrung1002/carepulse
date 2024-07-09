import { createUser } from "@/lib/actions/patient.action";
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const usePatientForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };
      const newUser = await createUser(user);
      if (newUser) router.push(`/patients/${newUser.$id}/register`);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return { isLoading, form, onSubmit };
};

export default usePatientForm;
