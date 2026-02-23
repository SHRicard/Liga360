import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { z } from 'zod';
import {
  InstitutionsCollection,
  type MediaAsset,
} from '../collections/institutions.collections';
import { CloudinaryHelper } from '../helpers/cloudinary.helper';
import { LogHelper } from '../helpers/log.helper';

const CreateInstitutionSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
  description: z
    .string()
    .max(500, 'La descripción no puede superar los 500 caracteres')
    .optional(),
  logoBase64: z.string().optional(),
});

Meteor.methods({
  async 'institutions.create'(args: unknown) {
    const { name, description, logoBase64 } =
      CreateInstitutionSchema.parse(args);

    if (!this.userId) {
      throw new Meteor.Error(
        'not-authorized',
        'Debe estar autenticado para crear una institución'
      );
    }

    const user = await Meteor.users.findOneAsync(this.userId);
    if (!user || (user as any).role !== 'owner') {
      throw new Meteor.Error(
        'not-authorized',
        'Usuario no autorizado para crear instituciones'
      );
    }

    try {
      const institutionId = Random.id();
      let logo: MediaAsset | undefined;

      if (logoBase64) {
        logo = await CloudinaryHelper.upsertImage(
          logoBase64,
          'liga360/institutions',
          institutionId
        );
      }

      const now = new Date();
      await InstitutionsCollection.insertAsync({
        _id: institutionId,
        ownerId: this.userId,
        name,
        description,
        logo,
        active: true,
        createdAt: now,
        updatedAt: now,
      });

      await LogHelper.logSuccess(this.userId, 'institutions.create', {
        institutionId,
        name,
        hasLogo: !!logo,
      });

      return { success: true, institutionId };
    } catch (error) {
      await LogHelper.logError(
        this.userId,
        'institutions.create',
        error instanceof Error ? error.message : 'Error desconocido',
        { attemptedName: name }
      );

      if (error instanceof Meteor.Error) throw error;

      throw new Meteor.Error('create-failed', 'Error al crear la institución');
    }
  },
});
