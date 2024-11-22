import { NextRequest, NextResponse } from 'next/server';
import { user } from "@/repository/user";
import * as bcrypt from 'bcryptjs';

export async function POST(req : NextRequest) {
  try {
    //permet de recup les données mis dans la requete
    const { username, password } = await req.json();

    // bcrypt.compareSync(password,user.password) permet de comparer password dans le user.ts avec le password dans la requete
    //en le cryptant d'abord
    if (
      username.toLowerCase() === user.username.toLowerCase() &&
      bcrypt.compareSync(password, user.password)
    ) {
      return NextResponse.json({ msg: "success" }, { status: 200 });
    }

    return NextResponse.json({ msg: "failure" }, { status: 401 });
  } catch (error) {
    console.error("Erreur lors du traitement de la requête :", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
