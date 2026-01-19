export type OnApproveCaptureData = {
    captureID?: string;
    orderID?: string;
    payer?: {
        address: {
            country_code?: string;
        }
        email_address?: string;
        name: {
            given_name?: string;
            surname?: string;
        }
        payer_id?: string;
    }
    status?: OnApproveStatus;
    success?: boolean;
}

enum OnApproveStatus {
    COMPLETED,
    PENDING
}

export type PayPalOrderCapture = {
  id: string;
  status: "COMPLETED" | "PENDING" | "FAILED";

  payment_source?: {
    paypal?: {
      email_address?: string;
      account_id?: string;
      account_status?: string;
      name?: {
        given_name?: string;
        surname?: string;
      };
      address?: {
        country_code?: string;
      };
    };
  };

  purchase_units?: Array<{
    reference_id?: string;
    shipping?: {
      name?: {
        full_name?: string;
      };
      address?: {
        address_line_1?: string;
        address_line_2?: string;
        admin_area_1?: string;
        admin_area_2?: string;
        postal_code?: string;
        country_code?: string;
      };
    };
    payments?: {
      captures?: Array<{
        id: string;
        status: string;
        amount?: {
          currency_code: string;
          value: string;
        };
        final_capture?: boolean;
        create_time?: string;
        update_time?: string;
      }>;
    };
  }>;

  payer?: {
    name?: {
      given_name?: string;
      surname?: string;
    };
    email_address?: string;
    payer_id?: string;
    address?: {
      country_code?: string;
    };
  };

  links?: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
};