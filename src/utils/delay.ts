// ============================================================================
// let checkpoint = Date.now();
export const delay = async (ms: number) => {
  // const time_ms = ms - (checkpoint - Date.now());

  const response = await new Promise((res) =>
    setTimeout(
      (args: any) => {
        // checkpoint = Date.now();

        return res(args);
      },
      // time_ms > 0 ? time_ms : 0
      ms
    )
  );
  return response;
};
