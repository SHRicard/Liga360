import { Meteor } from 'meteor/meteor';
import { v2 as cloudinary } from 'cloudinary';

export class CloudinaryHelper {
  private static configured = false;
  private static configure(): void {
    if (this.configured) return;

    if (!Meteor.isServer) {
      console.warn('CloudinaryHelper solo debe ejecutarse en el servidor');
      return;
    }

    const cloudinarySettings = Meteor.settings?.private?.cloudinary;

    if (!cloudinarySettings) {
      throw new Meteor.Error(
        'cloudinary-not-configured',
        'Faltan las credenciales de Cloudinary en settings.json (private.cloudinary)'
      );
    }

    cloudinary.config({
      cloud_name: cloudinarySettings.cloudName,
      api_key: cloudinarySettings.apiKey,
      api_secret: cloudinarySettings.apiSecret,
      secure: true,
    });

    this.configured = true;
  }

  static async upsertImage(
    base64String: string,
    folder: string,
    entityId: string
  ): Promise<{ publicId: string; version: number }> {
    this.configure();

    const result = await cloudinary.uploader.upload(base64String, {
      folder,
      public_id: entityId,
      overwrite: true,
      resource_type: 'image',
      transformation: [
        { width: 500, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    return {
      publicId: result.public_id,
      version: result.version,
    };
  }

  static async deleteImage(publicId: string): Promise<void> {
    this.configure();
    await cloudinary.uploader.destroy(publicId);
  }
}
