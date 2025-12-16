import { useCallback } from "react";
import { FilePondProps } from "react-filepond";
import { config } from "@/shared/utils/config";
import { request } from "@/request";

type LoadCallback = (response: unknown) => void;
type ErrorCallback = (message: string) => void;
type ProgressCallback = (
  isLengthComputable: boolean,
  loaded: number,
  total: number,
) => void;

export const useUpload = <T = unknown,>(
  onFinishUpload?: (response: T) => void,
) => {
  const uploadServer: FilePondProps["server"] = {
    process: useCallback(
      async (
        fieldName: string,
        file: unknown,
        metadata: unknown,
        load: unknown,
        error: unknown,
        progress: unknown,
      ) => {
        try {
          const formData = new FormData();
          formData.append(fieldName, file as File, (file as File).name);

          if (metadata && typeof metadata === "object") {
            Object.keys(metadata as Record<string, unknown>).forEach((key) => {
              const value = (metadata as Record<string, unknown>)[key];
              if (typeof value === "string" || value instanceof Blob) {
                formData.append(key, value);
              }
              // else {
              //   formData.append(key, String(value));
              // }
            });
          }

          const response = await request.post(
            config.BASE_PATH + "api/files",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total,
                  );
                  (progress as ProgressCallback)(true, percentCompleted, 100);
                }
              },
            },
          );

          if (response.data) {
            // FilePond expects a unique server id string for the 'load' callback.
            // Extract an id from the response payload if possible.
            let serverId: unknown = response.data;
            if (typeof response.data === "object" && response.data !== null) {
              const obj = response.data as Record<string, unknown>;
              const keys = [
                "_id",
                "id",
                "serverId",
                "fileId",
                "uuid",
                "key",
                "path",
              ] as const;
              for (const k of keys) {
                const v = obj[k as string];
                if (typeof v === "string" && v) {
                  serverId = v;
                  break;
                }
                if (typeof v === "number") {
                  serverId = String(v);
                  break;
                }
              }
            }
            (load as LoadCallback)(serverId);

            if (onFinishUpload) {
              try {
                onFinishUpload(response.data);
              } catch (e) {
                console.error("Failed to parse upload response:", e);
              }
            }
          } else {
            (load as LoadCallback)(response.data);
          }
        } catch (err: unknown) {
          console.error("File upload error:", err);
          if (err && typeof err === "object" && "response" in err) {
            const axiosError = err as {
              response: { data?: { message?: string } };
            };
            const errorMessage =
              axiosError.response.data?.message || "Upload failed";
            (error as ErrorCallback)(errorMessage);
          } else if (err && typeof err === "object" && "request" in err) {
            (error as ErrorCallback)(
              "Network error. Please check your connection.",
            );
          } else {
            (error as ErrorCallback)("Upload failed. Please try again.");
          }
        }
      },
      [onFinishUpload],
    ),

    revert: useCallback(
      async (uniqueId: unknown, load: unknown, error: unknown) => {
        try {
          let id: string | undefined;

          if (typeof uniqueId === "string") {
            const trimmed = uniqueId.trim();
            if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
              try {
                const parsed = JSON.parse(trimmed) as
                  | Record<string, unknown>
                  | unknown[];
                if (parsed && typeof parsed === "object") {
                  const obj = Array.isArray(parsed)
                    ? (parsed[0] as Record<string, unknown>)
                    : (parsed as Record<string, unknown>);
                  id = [
                    "id",
                    "serverId",
                    "fileId",
                    "uuid",
                    "key",
                    "path",
                    "_id",
                  ]
                    .map((k) => obj?.[k] as string | undefined)
                    .find(Boolean);
                }
              } catch {
                // not JSON, ignore
              }
            } else {
              id = trimmed;
            }
          }

          if (id) {
            await request.delete(
              `${config.BASE_PATH}api/files/${encodeURIComponent(id)}`,
            );
          } else {
            // Fallback: try sending the original uniqueId in the body in case server expects it differently
            await request.delete(`${config.BASE_PATH}api/files`, {
              data: { id: uniqueId },
            });
          }

          (load as () => void)();
        } catch (err) {
          console.error("File removal error:", err);
          (error as ErrorCallback)("Failed to remove file");
        }
      },
      [],
    ),

    load: useCallback(
      async (source: unknown, load: unknown, error: unknown) => {
        try {
          if (typeof source === "string") {
            const response = await request.get(source, {
              responseType: "blob",
            });

            const blob = new Blob([response.data], {
              type: response.headers["content-type"] || "video/mp4",
            });

            (load as (file: unknown) => void)(blob);
          } else {
            (load as (file: unknown) => void)(source as File);
          }
        } catch (err) {
          console.error("File load error:", err);
          (error as ErrorCallback)("Failed to load file");
        }
      },
      [],
    ),
  };

  return {
    uploadServer,
  };
};
