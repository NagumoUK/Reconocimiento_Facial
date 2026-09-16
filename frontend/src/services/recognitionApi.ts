import { appConfig } from '../config/env'
import { emptyPerson, PersonRecord } from '../types/person'

export async function recognizeFace(image: string): Promise<PersonRecord> {
  if (appConfig.usesDemoRecognition) {
    await new Promise((resolve) => window.setTimeout(resolve, 1100))
    return emptyPerson
  }

  const response = await fetch(`${appConfig.apiUrl}/api/v1/face-recognition/recognize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image }),
  })

  if (!response.ok) {
    throw new Error('No se pudo procesar el reconocimiento facial')
  }

  const result = await response.json()
  return { ...emptyPerson, ...result }
}
