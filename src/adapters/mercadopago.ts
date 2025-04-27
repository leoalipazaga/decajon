import { getLangFromUrl, useTranslatedPath } from 'i18n/utils'

export interface CardBrickResponse {
  installments: number
  issuer_id: string
  payer: {
    email: string
    identification: {
      number: string
      type: string
    }
  }
  payment_method_id: string
  token: string
  transaction_amount: number
}

interface CreateBrickSettings {
  amount: number
  email?: string
  onSuccess?: (res: any) => void
  onError?: () => void
}

export const createBrickSettings = ({
  amount,
  email,
  onError,
  onSuccess,
}: CreateBrickSettings) => ({
  initialization: {
    amount,
    payer: {
      email,
    },
  },
  customization: {
    visual: {
      style: {
        theme: 'default',
      },
    },
  },
  callbacks: {
    onReady: () => {
      /*
             Callback llamado cuando el Brick está listo.
             Aquí puede ocultar cargamentos de su sitio, por ejemplo.
            */
    },
    onSubmit: (formData: CardBrickResponse) => {
      // callback llamado al hacer clic en el botón de envío de datos
      return new Promise((resolve, reject) => {
        fetch(`${import.meta.env.PUBLIC_DECAJON_API}/brick.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((response) => {
            resolve(response)
            onSuccess?.(response)
          })
          .catch((error: unknown) => {
            reject()
            onError?.()
          })
      })
    },
    onError: (error: any) => {
      // callback llamado para todos los casos de error de Brick
      console.error('error', error)
    },
  },
})

export const createStatusBrick = (brick: {
  paymentId: string
  backUrls: { error: string; return: string }
}) => {
  return {
    initialization: {
      paymentId: brick.paymentId, // id de pago para mostrar
    },
    callbacks: {
      onReady: () => {
        /*
         Callback llamado cuando Brick está listo.
         Aquí puede ocultar cargamentos de su sitio, por ejemplo.
       */
      },
      onError: (error: unknown) => {
        // callback llamado solicitada para todos los casos de error de Brick
        console.error(error)
      },
    },
    customization: {
      visual: {
        showExternalReference: true,
      },
      backUrls: brick.backUrls,
    },
  }
}
