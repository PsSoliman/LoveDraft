import { configureQueryClient } from '../queryClient';

export default async function mySetupFunction() {
  configureQueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
}
