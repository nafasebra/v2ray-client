import { z } from "zod";
import { useEffect, useId, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";

function Main() {
  const firstRender = useRef(true);
  const textAreaId = useId();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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
    setError,
  } = useForm<z.infer<typeof validation>>({
    resolver: zodResolver(validation),
  });

  useEffect(() => {
    if (!firstRender.current) reset();
    else firstRender.current = false;
  }, [i18n.language, reset]);

  const handleClick = handleSubmit((values) => {
    let uuid = values.config;

    if (values.config.startsWith("vless://")) {
      const matches = values.config.match(/vless:\/\/(.*?)@/);
      if (matches && matches.length > 1) uuid = matches[1];
    } else if (values.config.startsWith("vmess://")) {
      const base64Text = values.config.substring("vmess://".length);
      try {
        const decodedText = atob(base64Text);
        const vmessData = JSON.parse(decodedText);
        uuid = vmessData.id;
      } catch (e) {
        /* empty */
      }
    }

    if (!uuid.trim())
      return setError("config", {
        message: t("main.form.config.invalid"),
        type: "validate",
      });

    navigate({ pathname: "/details", search: `?identifier=${uuid}` });
  });

  return (
    <section className="container-app grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-100px)] p-6 mx-auto">
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
        <Button type="submit">{t("main.check")}</Button>
      </form>
      <div>
        <img
          src="http://content.vip-status.site/site/themes/dark-1/images/Asset2.png"
          alt="banner"
          className="w-full max-w-xl mx-auto md:ml-auto"
        />
      </div>
    </section>
  );
}

export default Main;
