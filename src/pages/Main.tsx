import { z } from "zod";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { useQueryClient } from "@tanstack/react-query";
import { getDetails } from "@/api/queries";
import { keys } from "@/api/keys";
import { useActiveTheme } from "@/theme/utils/gradient";
import { Crisp } from "crisp-sdk-web";

function Main() {
  const { mainPhoto } = useActiveTheme();
  const firstRender = useRef(true);
  const textAreaId = useId();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [detailsPending, setDetailsPending] = useState(false);

  useEffect(() => {
    Crisp.configure("", { autoload: false });
  }, []);

  const validation = useMemo(
    () =>
      z.object({
        config: z.string().min(1, t("main.form.config.invalid")),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof validation>>({
    resolver: zodResolver(validation),
  });

  useEffect(() => {
    if (!firstRender.current) reset();
    else firstRender.current = false;
  }, [i18n.language, reset]);

  const handleClick = handleSubmit(async (values) => {
    setDetailsPending(true);

    try {
      const data = await queryClient.fetchQuery({
        queryFn: () => getDetails({ uuid: values.config, lang: i18n.language }),
        queryKey: [keys.DETAILS, values.config, i18n.language],
      });

      queryClient.setQueryData(
        [keys.DETAILS, data.data.result.hash, i18n.language],
        data
      );

      navigate({ pathname: `/details/${data.data.result.hash}` });
    } catch (e) {
      /* empty */
    }

    setDetailsPending(false);
  });

  return (
    <section className="container-app grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-100px)] p-6">
      <form onSubmit={handleClick} className="flex flex-col gap-3">
        <label htmlFor={textAreaId} className="text-2xl font-bold">
          {t("main.title")}
        </label>
        <textarea
          {...register("config")}
          className="text-white p-3 h-48 border-4 border-white bg-transparent rounded-xl focus:outline-none resize-none"
          rows={5}></textarea>
        {!!errors.config && (
          <p className="text-red-500">{errors.config.message}</p>
        )}
        <Button disabled={detailsPending} type="submit">
          {t("main.check")}
        </Button>
      </form>
      <div>
        <img
          src={mainPhoto}
          alt="banner"
          className="w-full max-w-xl mx-auto md:ml-auto"
        />
      </div>
    </section>
  );
}

export default Main;
